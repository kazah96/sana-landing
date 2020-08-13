import THREE from "three.js"

const vertexShader = `
attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main(void) {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform sampler2D texture;
uniform float time;

varying vec2 vUv;

float random (in float x) {
    return fract(sin(x)*1e4);
}
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(void) {
  vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );

  vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

    vec2 fMosaicScal = vec2(0,10);
  vec2 vScreenSize = vec2(1920.0,1080.0);
  
  vec2 n =vec2(
      floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x),
      floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y)
  );

    uv.y = clamp(uv.y,0.0,log(time*time*5.)/n.y);
  uv.y = clamp(uv.y,0.0,log(time*time*time)/random(n));


  vec4 t1 = texture2D(texture,uv)+ uv.y*1.0;
  vec4 t2 = texture2D(texture,uv);

  gl_FragColor = mix(t1, t2, clamp(time*time*0.5,0.,1.));}
  `

export default class Plane {
  constructor() {
    this.uniforms = {}
    this.texture = null
    this.mesh = null
  }

  loadTexture(image, callback) {
    const loader = new THREE.TextureLoader()
    loader.load(image, texture => {
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      this.texture = texture
      this.mesh = this.createMesh()
      callback()
    })
  }

  createMesh() {
    this.uniforms = {
      resolution: {
        type: "v2",
        value: new THREE.Vector2(
          document.body.clientWidth,
          document.body.clientHeight
        ),
      },

      imageResolution: {
        type: "v2",
        value: new THREE.Vector2(1280, 853),
      },

      texture: {
        type: "t",
        value: this.texture,
      },

      time: {
        type: "f",
        value: 0,
      },
    }

    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader,
        fragmentShader,
      })
    )
  }
  resize() {
    this.uniforms.resolution.value.set(
      document.body.clientWidth,
      document.body.clientHeight
    )
  }
}
