import * as PIXI from 'pixi.js'
import PlainText from '../PlainText'
import { Resources } from '../aliases'

export default class PlankButton extends PIXI.Container {
  private action: () => void
  private plank: PIXI.Sprite
  private text: PlainText
  constructor(text: string, resources: Resources, action: () => void) {
    super()
    this.action = action

    this.plank = new PIXI.Sprite(resources['assets/plank.png'].texture)
    this.plank.anchor.set(0.5)
    this.plank.scale.set(1, 0.8)

    this.text = new PlainText(text)
    this.text.anchor.set(0.5, 0.55)

    if(this.plank.width < this.text.width + 50) {
      this.plank.width = this.text.width + 50
    }

    this.addChild(this.plank)
    this.addChild(this.text)

    this.interactive = true
    this.on('mouseup', this.action).on('touchend', this.action)
  }
}