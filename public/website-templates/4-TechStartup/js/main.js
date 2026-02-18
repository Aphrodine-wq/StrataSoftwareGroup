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

// WebGL animated gradient background
const canvas = document.getElementById('webgl-canvas');
if (canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const vs = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;
    const fs = `precision highp float;uniform float uTime;uniform vec2 uResolution;
void main(){vec2 uv=gl_FragCoord.xy/uResolution;float t=uTime*0.5;
vec3 c1=vec3(0.39,0.4,0.95);vec3 c2=vec3(0.92,0.28,0.6);
float n=sin(uv.x*10.+t)*sin(uv.y*10.+t*0.7)*0.5+0.5;
vec3 col=mix(c1,c2,uv.x+uv.y*0.5+n*0.3+t*0.1);
col=mix(col,vec3(0.06,0.06,0.06),0.3);
gl_FragColor=vec4(col,0.85);}`;
    const vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vs);
    gl.compileShader(vshader);
    const fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fs);
    gl.compileShader(fshader);
    const prog = gl.createProgram();
    gl.attachShader(prog, vshader);
    gl.attachShader(prog, fshader);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, 'position');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uResolution = gl.getUniformLocation(prog, 'uResolution');
    function resize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    let t = 0;
    function loop() {
      t += 0.016;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(loop);
    }
    loop();
  }
}

// Pricing toggle
const toggle = document.getElementById('annualToggle');
const amounts = document.querySelectorAll('.amount[data-monthly]');
toggle?.addEventListener('change', function() {
  amounts.forEach(el => {
    el.textContent = this.checked ? el.dataset.annual : el.dataset.monthly;
  });
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.style.opacity = '1';
  });
}, { threshold: 0.2 });
document.querySelectorAll('.feature-card, .timeline-step, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s';
  observer.observe(el);
});
