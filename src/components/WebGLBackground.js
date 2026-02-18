import React, { useRef, useEffect, useCallback } from 'react';
import './WebGLBackground.css';

/**
 * WebGL fragment shader background — premium aurora/nebula effect
 * Multi-layered domain-warped noise with caustic bright spots,
 * flowing light rays, and mouse-reactive displacement.
 * Color-graded to Strata's bronze palette with teal/purple accents.
 * Pure WebGL, zero dependencies.
 */

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;

  /* ── Simplex-style noise (hash-based) ── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* ── 6-octave Fractal Brownian Motion ── */
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 6; i++) {
      f += amp * snoise(p * freq);
      freq *= 2.05;
      amp *= 0.48;
    }
    return f;
  }

  /* ── Double domain warping for ultra-organic flow ── */
  float warpedNoise(vec2 p, float t) {
    vec2 q = vec2(
      fbm(p + vec2(1.7, 9.2) + 0.12 * t),
      fbm(p + vec2(8.3, 2.8) + 0.10 * t)
    );
    vec2 r = vec2(
      fbm(p + 3.8 * q + vec2(2.1, 6.7) + 0.08 * t),
      fbm(p + 3.8 * q + vec2(5.4, 3.1) + 0.06 * t)
    );
    vec2 s = vec2(
      fbm(p + 3.2 * r + vec2(7.3, 1.8) + 0.05 * t),
      fbm(p + 3.2 * r + vec2(4.6, 8.5) + 0.04 * t)
    );
    return fbm(p + 3.5 * s);
  }

  /* ── Caustic bright spots ── */
  float caustics(vec2 p, float t) {
    float c = 0.0;
    float scale = 1.0;
    for (int i = 0; i < 3; i++) {
      vec2 uv = p * scale + t * 0.15 * float(i + 1);
      float n = snoise(uv);
      n = sin(n * 6.0 + t * 0.5);
      n = (n + 1.0) * 0.5;
      n = pow(n, 3.5);
      c += n * (1.0 / float(i + 2));
      scale *= 1.8;
    }
    return c;
  }

  /* ── Light ray effect ── */
  float lightRay(vec2 uv, float t) {
    float angle = t * 0.08;
    vec2 dir = vec2(cos(angle), sin(angle));
    float d = dot(uv - 0.5, dir);
    float ray = smoothstep(0.0, 0.15, abs(d));
    ray = 1.0 - ray;
    ray *= smoothstep(0.0, 0.4, length(uv - 0.5));
    ray *= 0.12;
    float ray2Angle = angle + 1.2;
    vec2 dir2 = vec2(cos(ray2Angle), sin(ray2Angle));
    float d2 = dot(uv - 0.5, dir2);
    float ray2 = 1.0 - smoothstep(0.0, 0.1, abs(d2));
    ray2 *= smoothstep(0.0, 0.3, length(uv - 0.5));
    ray2 *= 0.06;
    return ray + ray2;
  }

  /* ── Film grain ── */
  float grain(vec2 uv, float t) {
    return fract(sin(dot(uv * 1.5 + t * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv * vec2(aspect, 1.0) * 2.0;

    /* ── Mouse influence — displacement + glow ── */
    vec2 mouseNorm = u_mouse / u_resolution;
    vec2 mouseDisplace = (mouseNorm - 0.5) * 0.3;
    p += mouseDisplace;

    /* Mouse proximity glow */
    float mouseDist = length(uv - mouseNorm);
    float mouseGlow = exp(-mouseDist * mouseDist * 8.0) * 0.35;

    float t = u_time * 0.25;

    /* ── Layer 1: Deep warped noise (primary structure) ── */
    float n1 = warpedNoise(p * 0.7, t);

    /* ── Layer 2: Medium detail ── */
    float n2 = fbm(p * 2.5 + t * 0.4) * 0.22;

    /* ── Layer 3: Slow large undulations ── */
    float n3 = snoise(p * 0.25 - t * 0.08) * 0.4;

    /* ── Layer 4: Caustic bright spots ── */
    float caust = caustics(p * 0.6, t) * 0.2;

    /* ── Subtle strata bands ── */
    float strata = sin(uv.y * 3.14159 * 5.0 + t * 0.2 + n1 * 2.0) * 0.5 + 0.5;
    strata = smoothstep(0.3, 0.7, strata) * 0.05;

    /* ── Light rays ── */
    float rays = lightRay(uv, t);

    float n = n1 + n2 + n3 + strata;

    /* ═══ Color grading — Multi-tone palette ═══ */
    vec3 deepBg    = vec3(0.038, 0.050, 0.075);   /* Deep midnight blue-black */
    vec3 charcoal  = vec3(0.090, 0.110, 0.150);   /* Blue-grey undertone */
    vec3 ashGrey   = vec3(0.145, 0.180, 0.230);   /* Cool slate */
    vec3 bronze    = vec3(0.706, 0.541, 0.290);   /* #B48A4A */
    vec3 softGold  = vec3(0.878, 0.765, 0.549);   /* #E0C38C */
    vec3 warmAmber = vec3(0.920, 0.690, 0.320);   /* Warm amber accent */
    vec3 deepTeal  = vec3(0.110, 0.220, 0.260);   /* Subtle teal undertone */
    vec3 subtlePlum= vec3(0.180, 0.120, 0.200);   /* Subtle purple accent */

    /* ── Build color via smoothstep bands ── */
    float t1 = smoothstep(-0.8, 0.2, n);
    float t2 = smoothstep(-0.2, 0.5, n);
    float t3 = smoothstep(0.2, 0.7, n);
    float t4 = smoothstep(0.5, 1.0, n);

    vec3 color = mix(deepBg, charcoal, t1 * 0.8);
    color = mix(color, ashGrey, t2 * 0.5);

    /* Teal undertone in the mid-lights — creates depth */
    float tealMask = smoothstep(-0.1, 0.4, n) * (1.0 - smoothstep(0.4, 0.8, n));
    color = mix(color, deepTeal, tealMask * 0.25);

    /* Subtle plum in the shadows — richness */
    float plumMask = smoothstep(-0.6, -0.1, n) * (1.0 - smoothstep(0.0, 0.4, n));
    color = mix(color, subtlePlum, plumMask * 0.15);

    /* Bronze highlights */
    color = mix(color, bronze, t3 * 0.14);

    /* Gold peak highlights */
    color = mix(color, softGold, t4 * 0.08);

    /* Warm amber where caustics are bright */
    color += warmAmber * caust * 0.6;

    /* Add caustic brightness */
    color += vec3(0.95, 0.85, 0.65) * caust * 0.15;

    /* Light rays — warm bronze tint */
    color += bronze * rays;

    /* Mouse glow — warm golden */
    vec3 glowColor = mix(bronze, softGold, 0.6);
    color += glowColor * mouseGlow;

    /* ── Vignette — darker, more dramatic ── */
    float vig = 1.0 - length((uv - 0.5) * 1.4);
    vig = smoothstep(-0.05, 0.7, vig);
    color *= vig;

    /* ── Film grain (subtle) ── */
    float g = grain(gl_FragCoord.xy, t * 10.0) * 0.025;
    color += g - 0.0125;

    /* ── Final exposure ── */
    color *= 0.82;

    /* ── Subtle tone mapping to prevent clipping ── */
    color = color / (1.0 + color * 0.15);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function WebGLBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const MOUSE_LERP = 0.04;

  const handleMouseMove = useCallback((e) => {
    targetMouseRef.current.x = e.clientX;
    targetMouseRef.current.y = e.clientY;
  }, []);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;
    glRef.current = gl;

    // Compile shaders
    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link failed:', gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // Resize handler
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize mouse to center
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    targetMouseRef.current.x = window.innerWidth / 2;
    targetMouseRef.current.y = window.innerHeight / 2;

    // Render loop — smooth mouse lerp for fluid parallax
    function render() {
      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x += (t.x - m.x) * MOUSE_LERP;
      m.y += (t.y - m.y) * MOUSE_LERP;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, m.x, canvas.height - m.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [handleMouseMove]);

  return <canvas ref={canvasRef} className={`webgl-bg ${className}`} />;
}

export default WebGLBackground;
