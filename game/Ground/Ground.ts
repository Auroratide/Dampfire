import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'

export default class Ground extends PIXI.TilingSprite {
  constructor(resources: Resources, renderer: PIXI.Renderer) {
    super(resources['assets/ground.png'].texture, renderer.width, renderer.height)
  }
}