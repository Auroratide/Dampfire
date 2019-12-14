import * as PIXI from 'pixi.js'

export default class PlainText extends PIXI.Text {
  constructor(text: string, size: number = 32) {
    super(text, {
      fontFamily : 'Campfire',
      fontSize: size,
      fill : 0xffffff,
      align : 'center' 
    })

    this.anchor.set(0.5)
  }
}