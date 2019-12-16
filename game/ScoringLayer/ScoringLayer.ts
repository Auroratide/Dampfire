import * as PIXI from 'pixi.js'
import PlainText from '../PlainText'
import Tween from '../tools/Tween'
import sec from '../tools/sec'

export default class ScoringLayer extends PIXI.Container {
  private ticker: PIXI.Ticker
  constructor(ticker: PIXI.Ticker) {
    super()
    this.ticker = ticker
  }

  make = (obj: PIXI.DisplayObject, score: number) => {
    const text = new PlainText(Math.round(score).toString(), 14)
    text.position.set(obj.x, obj.y)

    this.addChild(text)

    new Tween(text).property('alpha').to(0).time(sec(0.5)).start(this.ticker)
    new Tween(text).property('y').to(obj.y - 20).time(sec(0.51)).onFinish(() => text.destroy()).start(this.ticker)
  }
}