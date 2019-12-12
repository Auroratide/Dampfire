import * as PIXI from 'pixi.js'

export default class Light extends PIXI.Sprite {
  constructor(renderer: PIXI.Renderer) {
    super(Light.gradient(renderer.width, renderer.height))
  }

  private static gradient(width: number, height: number): PIXI.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    
    const context = canvas.getContext('2d')
    const grad = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height))
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(1, '#000000')

    context.fillStyle = grad
    context.fillRect(0, 0, width, height)

    return PIXI.Texture.from(canvas)
  }
}