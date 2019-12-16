import * as PIXI from 'pixi.js'
import { Resources } from "../aliases";

export default class Explosion extends PIXI.AnimatedSprite {
  constructor(resources: Resources) {
    super([
      resources['assets/explosion/frame-001.png'].texture,
      resources['assets/explosion/frame-002.png'].texture,
      resources['assets/explosion/frame-003.png'].texture,
      resources['assets/explosion/frame-004.png'].texture
    ])
    this.animationSpeed = 0.043 * 8
    this.loop = false
    this.onComplete = () => this.destroy()

    this.anchor.set(0.5)

    this.play()
  }
}