// Mobile menu
(function() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.nav-links');
  if (btn && menu) {
    btn.addEventListener('click', function() {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.addEventListener('click', function() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }
})();

// WebGL data visualization - abstract nodes and connections
const canvas = document.getElementById('viz-canvas');
if (canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const vs = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;
    const fs = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float t=uTime;
  vec3 col=vec3(0.09,0.09,0.18);
  for(int i=0;i<8;i++){
    float fi=float(i);
    vec2 c=vec2(0.5+sin(t+fi)*0.3,0.5+cos(t*0.7+fi)*0.3);
    float d=length(uv-c);
    col+=vec3(0.02,0.78,0.51)*exp(-d*8.)*0.5;
  }
  vec2 m=uMouse;
  float dm=length(uv-m);
  col+=vec3(0,0.4,1.)*exp(-dm*6.)*0.3;
  col=mix(col,vec3(0.06,0.06,0.12),0.2);
  gl_FragColor=vec4(col,0.9);
}`;
    const v = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(v, vs);
    gl.compileShader(v);
    const f = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(f, fs);
    gl.compileShader(f);
    const prog = gl.createProgram();
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uResolution = gl.getUniformLocation(prog, 'uResolution');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    let mx = 0.5, my = 0.5;
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = 1 - (e.clientY - r.top) / r.height;
    });
    let t = 0;
    function loop() {
      t += 0.01;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(loop);
    }
    loop();
  }
}

// Pricing toggle
document.getElementById('annual')?.addEventListener('change', function() {
  document.querySelectorAll('.pricing-card span[data-m]').forEach(el => {
    el.textContent = this.checked ? el.dataset.a : el.dataset.m;
  });
});

// Scroll animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1'; });
}, { threshold: 0.2 });
document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s';
  obs.observe(el);
});
