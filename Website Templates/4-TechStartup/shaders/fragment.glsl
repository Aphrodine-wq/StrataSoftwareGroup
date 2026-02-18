precision highp float;
uniform float uTime;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = uTime * 0.5;
  vec3 c1 = vec3(0.39, 0.4, 0.95);
  vec3 c2 = vec3(0.92, 0.28, 0.6);
  float n = sin(uv.x * 10.0 + t) * sin(uv.y * 10.0 + t * 0.7) * 0.5 + 0.5;
  vec3 col = mix(c1, c2, uv.x + uv.y * 0.5 + n * 0.3 + t * 0.1);
  col = mix(col, vec3(0.06, 0.06, 0.06), 0.3);
  gl_FragColor = vec4(col, 0.85);
}
