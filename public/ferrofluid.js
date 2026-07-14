import { Renderer, Program, Mesh, Triangle } from 'ogl';

const MAX_COLORS = 8;

function hexToRGB(hex) {
  const c = hex.replace('#', '').padEnd(6, '0');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
}

function prepColors(input) {
  const base = (input && input.length ? input : ['#4F46E5', '#06B6D4', '#E0F2FE']).slice(0, MAX_COLORS);
  const count = base.length;
  const arr = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  }
  const avg = [0, 0, 0];
  for (let i = 0; i < count; i++) {
    avg[0] += arr[i][0]; avg[1] += arr[i][1]; avg[2] += arr[i][2];
  }
  avg[0] /= count; avg[1] /= count; avg[2] /= count;
  return { arr, count, avg };
}

function flowVec(d) {
  switch (d) {
    case 'up': return [0, 1];
    case 'down': return [0, -1];
    case 'left': return [-1, 0];
    case 'right': return [1, 0];
    default: return [0, -1];
  }
}

const vertex = 'attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}';

const fragment = 'precision highp float;\nuniform vec3 iResolution;uniform vec2 iMouse;uniform float iTime;\nuniform vec3 uColor0,uColor1,uColor2,uColor3,uColor4,uColor5,uColor6,uColor7;\nuniform int uColorCount;uniform vec2 uFlow;uniform float uSpeed,uScale,uTurbulence,uFluidity,uRimWidth,uSharpness,uShimmer,uGlow,uOpacity;\nuniform float uMouseEnabled,uMouseStrength,uMouseRadius;\nvarying vec2 vUv;\n#define PI 3.14159265\nvec3 palette(float h){int count=uColorCount;if(count<1)count=1;int idx=int(floor(clamp(h,0.0,0.999999)*float(count)));\nif(idx<=0)return uColor0;if(idx==1)return uColor1;if(idx==2)return uColor2;if(idx==3)return uColor3;\nif(idx==4)return uColor4;if(idx==5)return uColor5;if(idx==6)return uColor6;return uColor7;}\nfloat hash(vec3 p){p=fract(p*0.1031);p+=dot(p,p.zyx+33.33);return fract((p.x+p.y)*p.z);}\nfloat smin(float a,float b,float k){float r=exp2(-a/k)+exp2(-b/k);return -k*log2(r);}\nfloat sinlerp(float a,float b,float w){return mix(a,b,(sin(w*PI-PI/2.0)+1.0)/2.0);}\nfloat vn(vec2 p,float s,float seed){vec2 cellp=floor(p/s);vec2 relp=mod(p,s);\nfloat g1=hash(vec3(cellp,seed));float g2=hash(vec3(cellp.x+1.0,cellp.y,seed));\nfloat g3=hash(vec3(cellp.x+1.0,cellp.y+1.0,seed));float g4=hash(vec3(cellp.x,cellp.y+1.0,seed));\nfloat bx=sinlerp(g1,g2,relp.x/s);float tx=sinlerp(g4,g3,relp.x/s);return sinlerp(bx,tx,relp.y/s);}\nfloat dbn(vec2 p,float s,float seed){float o=s/2.0;\nfloat n0=vn(p,s,seed);float n1=vn(p+vec2(o,o),s,seed+0.1);float n2=vn(p+vec2(-o,o),s,seed+0.2);\nfloat n3=vn(p+vec2(o,-o),s,seed+0.3);float n4=vn(p+vec2(-o,-o),s,seed+0.4);\nreturn(2.0*n0+1.5*n1+1.25*n2+1.125*n3+n4)/7.0;}\nvoid mainImage(out vec4 c,in vec2 p){float ref=700.0/max(uScale,0.05);vec2 pp=p/iResolution.y*ref;\nfloat spd=200.0*uSpeed;float t=iTime;vec2 dir=uFlow;vec2 perp=vec2(-dir.y,dir.x);\nfloat d1=vn(pp+perp*(t*spd),60.0,10.0)*50.0*uTurbulence;float d2=vn(pp-perp*(t*spd),120.0,15.0)*100.0*uTurbulence;\nfloat pk1=dbn(pp+d1+dir*(t*spd*0.5),40.0,1.0);float pk2=dbn(pp+d2-dir*(t*spd*0.5),40.0,0.0);\nfloat mp=smin(pk1,pk2,max(uFluidity,0.001));float mg=0.0;\nif(uMouseEnabled>0.5){vec2 mp_=iMouse/iResolution.y*ref;float md=length(pp-mp_)/ref;float rr=max(uMouseRadius,0.02);mg=exp(-md*md/(rr*rr))*uMouseStrength;}\nfloat band=(uRimWidth-abs((mp-0.4)*2.0))*5.0;float ltn=clamp(band-vn(pp+dir*(t*spd*0.5),60.0,12.0)*uShimmer,0.0,1.0);\nltn=pow(ltn,uSharpness)*uGlow;ltn*=clamp(1.0-mg,0.0,1.0);float h=clamp(0.5+(pk1-pk2)*0.8,0.0,1.0);\nvec3 col=palette(h);vec3 oc=col*ltn;float a=clamp(max(oc.r,max(oc.g,oc.b)),0.0,1.0);c=vec4(oc,a*uOpacity);}\nvoid main(){vec4 color;mainImage(color,vUv*iResolution.xy);gl_FragColor=color;}';

export function initFerrofluid(container, opts = {}) {
  const {
    colors = ['#ffffff', '#ffffff', '#ffffff'],
    speed = 0.5, scale = 1.6, turbulence = 1, fluidity = 0.1,
    rimWidth = 0.2, sharpness = 2.5, shimmer = 1.5, glow = 2,
    flowDirection = 'down', opacity = 1,
    mouseInteraction = true, mouseStrength = 1, mouseRadius = 0.35, mouseDampening = 0.15, dpr
  } = opts;

  const renderer = new Renderer({
    dpr: dpr ?? (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1),
    alpha: true, antialias: true
  });

  const gl = renderer.gl;
  const canvas = gl.canvas;
  gl.clearColor(0, 0, 0, 0);
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;top:0;left:0;';
  container.appendChild(canvas);

  const { arr, count, avg } = prepColors(colors);
  const uniforms = {
    iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
    iMouse: { value: [0, 0] }, iTime: { value: 0 },
    uColor0: { value: arr[0] }, uColor1: { value: arr[1] },
    uColor2: { value: arr[2] }, uColor3: { value: arr[3] },
    uColor4: { value: arr[4] }, uColor5: { value: arr[5] },
    uColor6: { value: arr[6] }, uColor7: { value: arr[7] },
    uColorCount: { value: count }, uMouseColor: { value: avg },
    uFlow: { value: flowVec(flowDirection) },
    uSpeed: { value: speed }, uScale: { value: scale },
    uTurbulence: { value: turbulence }, uFluidity: { value: fluidity },
    uRimWidth: { value: rimWidth }, uSharpness: { value: sharpness },
    uShimmer: { value: shimmer }, uGlow: { value: glow },
    uOpacity: { value: opacity },
    uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
    uMouseStrength: { value: mouseStrength }, uMouseRadius: { value: mouseRadius }
  };

  const program = new Program(gl, { vertex, fragment, uniforms });
  const geometry = new Triangle(gl);
  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    const rect = container.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    }
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const mouseTarget = [0, 0];
  let lastTime = 0;

  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const sc = renderer.dpr || 1;
    mouseTarget[0] = (e.clientX - rect.left) * sc;
    mouseTarget[1] = (rect.height - (e.clientY - rect.top)) * sc;
  }
  if (mouseInteraction) canvas.addEventListener('pointermove', onPointerMove);

  let rafId;
  function loop(t) {
    rafId = requestAnimationFrame(loop);
    uniforms.iTime.value = t * 0.001;
    if (mouseDampening > 0) {
      if (!lastTime) lastTime = t;
      const dt = (t - lastTime) / 1000;
      lastTime = t;
      const tau = Math.max(1e-4, mouseDampening);
      let factor = 1 - Math.exp(-dt / tau);
      if (factor > 1) factor = 1;
      uniforms.iMouse.value[0] += (mouseTarget[0] - uniforms.iMouse.value[0]) * factor;
      uniforms.iMouse.value[1] += (mouseTarget[1] - uniforms.iMouse.value[1]) * factor;
    } else { lastTime = t; }
    try { renderer.render({ scene: mesh }); } catch (e) { console.error(e); }
  }
  rafId = requestAnimationFrame(loop);

  return function destroy() {
    cancelAnimationFrame(rafId);
    if (mouseInteraction) canvas.removeEventListener('pointermove', onPointerMove);
    ro.disconnect();
    if (canvas.parentElement === container) container.removeChild(canvas);
    [program, geometry, mesh].forEach(o => { if (o && typeof o.remove === 'function') o.remove(); });
    if (renderer && typeof renderer.destroy === 'function') renderer.destroy();
  };
}
