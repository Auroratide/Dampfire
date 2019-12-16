import * as PIXI from 'pixi.js'
import PlainText from '../PlainText'
import { Resources } from '../aliases'
import SoundManager from '../SoundManager'

export default class PlankButton extends PIXI.Container {
  private action: () => void
  private plank: PIXI.Sprite
  private text: PlainText
  private sfx: SoundManager
  constructor(text: string, resources: Resources, sfx: SoundManager, action: () => void) {
    super()
    this.action = action
    this.sfx = sfx

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
    this
      .on('mousedown', this.onPress)
      .on('touchstart', this.onPress)
      .on('mouseover', this.onHover)
      .on('mouseout', this.offHover)
      .on('mouseup', this.onRelease)
      .on('touchend', this.onRelease)
  }

  private onHover = () => {
    this.plank.rotation = -Math.PI / 30
  }

  private offHover = () => {
    this.plank.rotation = 0
  }

  private onPress = () => {
    this.plank.rotation = Math.PI / 27
    this.sfx.wood.play()
  }

  private onRelease = () => {
    this.plank.rotation = 0
    this.action()
  }
}