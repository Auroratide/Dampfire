import * as PIXI from 'pixi.js'
import Health from '../domain/Health'

export default class Light extends PIXI.Sprite {
  private health: Health
  constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, health: Health) {
    super(Light.gradient(renderer.width, renderer.height))
    this.health = health

    this.anchor.set(0.5)
    ticker.add(this.adjustLightLevel)
  }

  private adjustLightLevel = () => {
    const ratio = this.health.ratio()
    this.scale.set(ratio)
  }

  private static gradient(width: number, height: number): PIXI.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = width * 4
    canvas.height = height * 4
    
    const context = canvas.getContext('2d')
    const grad = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(width, height))
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(1, '#000000')

    context.fillStyle = grad
    context.fillRect(0, 0, canvas.width, canvas.height)

    return PIXI.Texture.from(canvas)
  }
}