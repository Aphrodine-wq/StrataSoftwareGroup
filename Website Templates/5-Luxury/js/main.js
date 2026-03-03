// WebGL particle effect - gold/cream particles triggered by scroll
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const vs = `attribute vec2 a_pos;attribute float a_size;uniform vec2 u_res;void main(){gl_Position=vec4(a_pos*2.-1.,0,1);gl_PointSize=a_size;}`;
    const fs = `precision mediump float;void main(){float d=distance(gl_PointCoord,vec2(0.5));if(d>0.5)discard;float a=1.-smoothstep(0.,0.5,d);gl_FragColor=vec4(0.83,0.69,0.22,a*0.6);}`;
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
    const sizeBuf = gl.createBuffer();
    const N = 150;
    const particles = [];
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        size: 2 + Math.random() * 4
      });
    }
    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    let scrollY = 0;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });
    function loop() {
      const intensity = Math.min(1, scrollY / 400);
      gl.clearColor(0.1, 0.1, 0.1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy + 0.005 * intensity;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) { p.y = 0; p.vy = 0.01; }
      });
      const pos = new Float32Array(particles.map(p => [p.x, p.y]).flat());
      const sizes = new Float32Array(particles.map(p => p.size * (0.5 + intensity * 0.5)));
      const aPos = gl.getAttribLocation(prog, 'a_pos');
      const aSize = gl.getAttribLocation(prog, 'a_size');
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aSize);
      gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, N);
      requestAnimationFrame(loop);
    }
    loop();
  }
}

document.querySelector('.join-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you. We will be in touch.');
});
