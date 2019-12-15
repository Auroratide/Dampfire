import * as PIXI from 'pixi.js'
import PlainText from '../PlainText'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Tween from '../tools/Tween'
import sec from '../tools/sec'

export default class Text extends PIXI.Container {
  private plank: PIXI.Sprite
  private text: PlainText
  private ticker: PIXI.Ticker

  private showingY: number
  constructor(resources: Resources, positioning: Positioning, ticker: PIXI.Ticker) {
    super()
    this.ticker = ticker

    this.plank = new PIXI.Sprite(resources['assets/plank-large.png'].texture)
    this.plank.anchor.set(0.5, 1)
    positioning.bottomCenter(this.plank)
    this.showingY = this.plank.y
    this.plank.y += this.plank.height

    this.text = new PlainText('', 22, 'left', this.plank.width - 60)
    this.text.anchor.set(0, 0)
    this.text.position.set(-this.plank.width / 2 + 30, 5 - this.plank.height)

    this.addChild(this.plank)
    this.plank.addChild(this.text)
  }

  showText = (text: string) => {
    const showTween = new Tween(this.plank).property('y').to(this.showingY).time(sec(0.25))
    if(this.plank.y <= this.showingY + 1) {
      new Tween(this.plank).property('y').to(this.showingY + this.plank.height).time(sec(0.25)).onFinish(() => {
        this.text.text = text
        showTween.start(this.ticker)
      }).start(this.ticker)
    } else {
      this.text.text = text
      showTween.start(this.ticker)
    }
  }

  hide = () => {
    new Tween(this.plank).property('y').to(this.showingY + this.plank.height).time(sec(0.25)).start(this.ticker)
  }
  
}