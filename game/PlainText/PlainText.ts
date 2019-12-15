import * as PIXI from 'pixi.js'

export default class PlainText extends PIXI.Text {
  constructor(text: string, size: number = 32, align: string = 'center') {
    super(text, {
      fontFamily : 'Campfire',
      fontSize: size,
      fill : 0xffffff,
      align : align
    })

    this.anchor.set(0.5)
  }
}