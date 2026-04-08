use axum::{routing::get, Router, Json};
use serde::{Deserialize, Serialize};
use std::process::Command;
use tower_http::services::ServeDir;

#[derive(Serialize, Deserialize, Clone)]
struct MachineStats {
    name: String,
    hostname: String,
    ip: String,
    cpu_usage: String,
    memory_used: String,
    memory_total: String,
    disk_used: String,
    disk_total: String,
    disk_percent: String,
    uptime: String,
    online: bool,
}

#[derive(Serialize, Deserialize, Clone)]
struct ServiceStatus {
    name: String,
    machine: String,
    status: String,
    service_type: String,
}

#[derive(Serialize, Deserialize, Clone)]
struct VpnStatus {
    active: bool,
    exit_ip: String,
    interfaces: Vec<String>,
}

#[derive(Serialize, Deserialize, Clone)]
struct SyncFolder {
    id: String,
    label: String,
    state: String,
    global_files: u64,
    need_files: u64,
    in_sync: bool,
}

#[derive(Serialize, Deserialize)]
struct ControlData {
    machines: Vec<MachineStats>,
    services: Vec<ServiceStatus>,
    vpn: VpnStatus,
    sync_folders: Vec<SyncFolder>,
    timestamp: String,
}

fn run_cmd(cmd: &str) -> String {
    Command::new("bash")
        .arg("-c")
        .arg(cmd)
        .output()
        .map(|o| String::from_utf8_lossy(&o.stdout).trim().to_string())
        .unwrap_or_default()
}

fn run_ssh(host: &str, user: &str, cmd: &str) -> String {
    let full = format!("ssh -o ConnectTimeout=3 -o StrictHostKeyChecking=no {}@{} '{}' 2>/dev/null", user, host, cmd);
    run_cmd(&full)
}

fn get_local_stats() -> MachineStats {
    MachineStats {
        name: "Mini PC".into(),
        hostname: run_cmd("hostname"),
        ip: "192.168.12.220".into(),
        cpu_usage: run_cmd("top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | head -1"),
        memory_used: run_cmd("free -h | awk '/Mem:/{print $3}'"),
        memory_total: run_cmd("free -h | awk '/Mem:/{print $2}'"),
        disk_used: run_cmd("df -h / | awk 'NR==2{print $3}'"),
        disk_total: run_cmd("df -h / | awk 'NR==2{print $2}'"),
        disk_percent: run_cmd("df -h / | awk 'NR==2{print $5}'"),
        uptime: run_cmd("uptime -p"),
        online: true,
    }
}

fn get_remote_stats(host: &str, user: &str, name: &str) -> MachineStats {
    let check = run_ssh(host, user, "echo ok");
    if check.is_empty() {
        return MachineStats {
            name: name.into(), hostname: String::new(), ip: host.into(),
            cpu_usage: String::new(), memory_used: String::new(), memory_total: String::new(),
            disk_used: String::new(), disk_total: String::new(), disk_percent: String::new(),
            uptime: String::new(), online: false,
        };
    }
    MachineStats {
        name: name.into(),
        hostname: run_ssh(host, user, "hostname"),
        ip: host.into(),
        cpu_usage: run_ssh(host, user, "top -bn1 | grep Cpu | awk '{print $2}' | head -1"),
        memory_used: run_ssh(host, user, "free -h | awk '/Mem:/{print $3}'"),
        memory_total: run_ssh(host, user, "free -h | awk '/Mem:/{print $2}'"),
        disk_used: run_ssh(host, user, "df -h / | awk 'NR==2{print $3}'"),
        disk_total: run_ssh(host, user, "df -h / | awk 'NR==2{print $2}'"),
        disk_percent: run_ssh(host, user, "df -h / | awk 'NR==2{print $5}'"),
        uptime: run_ssh(host, user, "uptime -p"),
        online: true,
    }
}

fn get_services() -> Vec<ServiceStatus> {
    let mut services = Vec::new();

    // Local docker
    let docker = run_cmd("docker ps --format '{{.Names}}|{{.Status}}' 2>/dev/null");
    for line in docker.lines().filter(|l| !l.is_empty()) {
        let parts: Vec<&str> = line.split('|').collect();
        services.push(ServiceStatus {
            name: parts.first().unwrap_or(&"").to_string(),
            machine: "Mini PC".into(),
            status: parts.get(1).unwrap_or(&"").to_string(),
            service_type: "docker".into(),
        });
    }

    // Local systemd
    for svc in &["jellyfin", "smb", "nmb"] {
        let st = run_cmd(&format!("systemctl is-active {} 2>/dev/null", svc));
        services.push(ServiceStatus {
            name: svc.to_string(), machine: "Mini PC".into(),
            status: st, service_type: "systemd".into(),
        });
    }

    // Remote docker on big PC
    let remote_docker = run_ssh("192.168.12.61", "waltburge", "docker ps --format '{{.Names}}|{{.Status}}' 2>/dev/null");
    for line in remote_docker.lines().filter(|l| !l.is_empty()) {
        let parts: Vec<&str> = line.split('|').collect();
        services.push(ServiceStatus {
            name: parts.first().unwrap_or(&"").to_string(),
            machine: "Big PC".into(),
            status: parts.get(1).unwrap_or(&"").to_string(),
            service_type: "docker".into(),
        });
    }

    // WireGuard tunnels
    for iface in &["wg0", "wg1"] {
        let st = run_cmd(&format!("systemctl is-active wg-quick@{} 2>/dev/null", iface));
        services.push(ServiceStatus {
            name: format!("wireguard-{}", iface), machine: "Mini PC".into(),
            status: st, service_type: "systemd".into(),
        });
    }

    // Syncthing
    let st = run_cmd("systemctl --user is-active syncthing 2>/dev/null || echo active");
    services.push(ServiceStatus {
        name: "syncthing".into(), machine: "Mini PC".into(),
        status: st, service_type: "systemd".into(),
    });

    services
}

fn get_vpn() -> VpnStatus {
    let wg = run_cmd("sudo wg show interfaces 2>/dev/null");
    let exit_ip = run_cmd("curl -s --max-time 3 http://checkip.amazonaws.com 2>/dev/null");
    let interfaces: Vec<String> = wg.split_whitespace().map(|s| s.to_string()).collect();
    VpnStatus {
        active: !interfaces.is_empty(),
        exit_ip,
        interfaces,
    }
}

fn get_sync() -> Vec<SyncFolder> {
    let api_key = run_cmd("grep apikey ~/.local/state/syncthing/config.xml | sed 's/.*>\\(.*\\)<.*/\\1/'");
    let mut folders = Vec::new();
    for (id, label) in &[("claude-brain", "Claude Brain"), ("thevault", "TheVault")] {
        let data = run_cmd(&format!(
            "curl -s -H 'X-API-Key: {}' 'http://localhost:8384/rest/db/status?folder={}' 2>/dev/null",
            api_key, id
        ));
        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&data) {
            let gf = parsed["globalFiles"].as_u64().unwrap_or(0);
            let nf = parsed["needFiles"].as_u64().unwrap_or(0);
            folders.push(SyncFolder {
                id: id.to_string(), label: label.to_string(),
                state: parsed["state"].as_str().unwrap_or("unknown").to_string(),
                global_files: gf, need_files: nf, in_sync: nf == 0,
            });
        }
    }
    folders
}

async fn api_status() -> Json<ControlData> {
    let local = get_local_stats();
    let big_pc = get_remote_stats("192.168.12.61", "waltburge", "Big PC");
    let services = get_services();
    let vpn = get_vpn();
    let sync_folders = get_sync();
    let timestamp = run_cmd("date -Iseconds");

    Json(ControlData { machines: vec![local, big_pc], services, vpn, sync_folders, timestamp })
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/status", get(api_status))
        .fallback_service(ServeDir::new("static").append_index_html_on_directories(true));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3030").await.unwrap();
    println!("Strata Control running at http://0.0.0.0:3030");
    axum::serve(listener, app).await.unwrap();
}
