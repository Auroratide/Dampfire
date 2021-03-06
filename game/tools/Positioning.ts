import * as PIXI from 'pixi.js'

export default class Positioning {
  private renderer: PIXI.Renderer
  constructor(renderer: PIXI.Renderer) {
    this.renderer = renderer
  }

  y = (obj: PIXI.DisplayObject, units: number) => {
    obj.y = units
  }

  centerX = (obj: PIXI.DisplayObject) => {
    obj.x = this.renderer.width / 2
  }

  center = (obj: PIXI.DisplayObject) => {
    obj.position.set(this.renderer.width / 2, this.renderer.height / 2)
  }

  topRight = (obj: PIXI.DisplayObject, padding: number = 0) => {
    obj.position.set(this.renderer.width - padding, 0)
  }

  bottomCenter = (obj: PIXI.DisplayObject) => {
    obj.position.set(this.renderer.width / 2, this.renderer.height)
  }

  randomOffScreen = (obj: PIXI.DisplayObject) => {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.max(this.renderer.width, this.renderer.height) * 0.70914 // sqrt(2) / 2
    obj.position.set(Math.cos(angle) * distance + this.renderer.width / 2, Math.sin(angle) * distance + this.renderer.height / 2)
  }
}