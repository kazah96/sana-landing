import React from "react"
import THREE from "three.js"
import Plane from "./plane"

import "./style.css"

export default class WebglTransition extends React.Component {
  container = null
  camera = null
  plane = null
  renderer = null
  clock = null
  scene = null
  isPlaying = true

  onWindowResize = plane => {
    this.container.width = document.body.clientWidth
    this.container.height = document.body.clientHeight
    this.camera.aspect = document.body.clientWidth / document.body.clientHeight
    this.camera.updateProjectionMatrix()
    plane.mesh.material.uniforms.resolution.value.set(
      document.body.clientWidth,
      document.body.clientHeight
    )

    this.renderer.setSize(document.body.clientWidth, document.body.clientHeight)
  }

  onClick = plane => {
    plane.uniforms.time.value = 0
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.isPlaying && this.draw()
  }

  draw = () => {
    let delta = this.clock.getDelta()

    this.plane.uniforms.time.value += delta*3
    this.renderer.render(this.scene, this.camera)
  }

  init = () => {
    this.container = document.getElementById("container")

    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: this.container,
      alpha: true,
    })

    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()
    this.camera = new THREE.PerspectiveCamera(
      45,
      document.body.clientWidth / document.body.clientHeight,
      1,
      100
    )

    this.renderer.setSize(document.body.clientWidth, document.body.clientHeight)
    this.renderer.setClearColor(0xffffff, 0.0)

    this.plane = new Plane()
    this.plane.loadTexture(
      "/static/adrenaline_call-56f0506b0b79dedd39f36a44ef3e1ae2.jpg",
      () => {
        this.animate()
        this.scene.add(this.plane.mesh)
        window.addEventListener(
          "resize",
          () => this.onWindowResize(this.plane),
          false
        )
        this.onWindowResize(this.plane)
        window.addEventListener("click", () => this.onClick(this.plane), false)
      }
    )
  }

  componentDidMount() {
    this.init()

    window.triggerAnimation = () => {
      console.log("sdfd")
      this.setState({ isPlaying: true })
    }
  }

  render() {
    return (
      <canvas id="container" className="contr">
        vcvcvc
      </canvas>
    )
  }
}
