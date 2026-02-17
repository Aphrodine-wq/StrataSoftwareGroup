import React, { useRef, useEffect, useCallback } from 'react';
import './WebGLBackground.css';

/**
 * WebGL fragment shader background — organic flowing noise
 * Color-graded to Strata's bronze / dark palette.
 * Pure WebGL, zero dependencies.
 */

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;

  // --- Simplex-style noise (hash-based) ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
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

  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      f += amp * snoise(p);
      p *= 2.1;
      amp *= 0.5;
    }
    return f;
  }

  // Domain warping for organic look
  float warpedNoise(vec2 p, float t) {
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + 0.12 * t),
      fbm(p + vec2(5.2, 1.3) + 0.15 * t)
    );
    vec2 r = vec2(
      fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.08 * t),
      fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.10 * t)
    );
    return fbm(p + 4.0 * r);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv * vec2(aspect, 1.0) * 2.0;

    // Mouse influence — subtle displacement
    vec2 mouseNorm = u_mouse / u_resolution;
    p += (mouseNorm - 0.5) * 0.15;

    float t = u_time * 0.3;

    // Layer 1: Deep warped noise
    float n1 = warpedNoise(p * 0.8, t);

    // Layer 2: Finer detail
    float n2 = snoise(p * 3.0 + t * 0.5) * 0.15;

    // Layer 3: Slow large undulations
    float n3 = snoise(p * 0.3 - t * 0.1) * 0.3;

    float n = n1 + n2 + n3;

    // Color grading — Strata bronze/charcoal palette
    vec3 deepBg   = vec3(0.051, 0.067, 0.090);   // #0D1117
    vec3 bronze    = vec3(0.706, 0.541, 0.290);   // #B48A4A
    vec3 softGold  = vec3(0.878, 0.765, 0.549);   // #E0C38C
    vec3 ashGrey   = vec3(0.165, 0.212, 0.263);   // #2A3643

    // Map noise to color
    float t1 = smoothstep(-0.6, 0.3, n);
    float t2 = smoothstep(0.2, 0.8, n);
    float t3 = smoothstep(0.5, 1.0, n);

    vec3 color = mix(deepBg, ashGrey, t1 * 0.6);
    color = mix(color, bronze, t2 * 0.08);
    color = mix(color, softGold, t3 * 0.04);

    // Vignette — darken edges strongly
    float vignette = 1.0 - length((uv - 0.5) * 1.3);
    vignette = smoothstep(0.0, 0.7, vignette);
    color *= vignette;

    // Keep it subtle — very dark overall
    color *= 0.7;

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

    const handleMouseMove = useCallback((e) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
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
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap for perf
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Render loop
        function render() {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            gl.uniform1f(uTime, elapsed);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
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
