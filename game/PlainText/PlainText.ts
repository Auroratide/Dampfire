import * as PIXI from 'pixi.js'

export default class PlainText extends PIXI.Text {
  constructor(text: string, size: number = 32, align: string = 'center', width?: number) {
    super(text, {
      fontFamily : 'Skranji',
      fontSize: size,
      fill : 0xffffff,
      align : align,
      wordWrap: true,
      wordWrapWidth: width
    })

    this.resolution = 2
    this.anchor.set(0.5)
  }
}