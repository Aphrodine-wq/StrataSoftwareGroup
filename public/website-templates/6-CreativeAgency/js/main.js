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

// WebGL generative art - noise-based patterns, color transitions
const canvas = document.getElementById('generative-canvas');
if (canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const vs = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;
    const fs = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
float noise(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  f=f*f*(3.-2.*f);
  float a=hash(i);
  float b=hash(i+vec2(1,0));
  float c=hash(i+vec2(0,1));
  float d=hash(i+vec2(1,1));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
float fbm(vec2 p){
  float v=0.;
  float f=1.;
  for(int i=0;i<5;i++){
    v+=noise(p*f)/f;
    f*=2.;
  }
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution;
  float t=uTime*0.3;
  vec2 p=uv*4.+vec2(t*0.5,t*0.3);
  float n=fbm(p)+fbm(p*2.+t)*0.5;
  vec3 c1=vec3(1.,0.,0.43);
  vec3 c2=vec3(0.,0.85,1.);
  vec3 col=mix(c1,c2,n*0.5+uv.x*0.3+uv.y*0.2);
  col=mix(col,vec3(0.04,0.04,0.06),0.4);
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
      t += 0.016;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(loop);
    }
    loop();
  }
}

// Scroll fade
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1'; });
}, { threshold: 0.2 });
document.querySelectorAll('.case-card, .service-card, .team-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s';
  obs.observe(el);
});
