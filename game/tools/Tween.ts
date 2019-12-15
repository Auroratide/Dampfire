import * as PIXI from 'pixi.js'

export default class Tween {
  private obj: any

  private prop: string
  private target: number
  private startValue: number
  private frames: number
  private onFin: () => void = () => {}
  constructor(obj: any) {
    this.obj = obj
  }

  property = (name: string) => {
    this.prop = name
    return this
  }
  to = (target: number) => {
    this.target = target
    return this
  }
  time = (frames: number) => {
    this.frames = frames
    return this
  }
  onFinish = (f: () => void) => {
    this.onFin = f
    return this
  }

  start = (ticker: PIXI.Ticker) => {
    this.startValue = this.obj[this.prop]
    const delta = (this.target - this.startValue) / this.frames
    let i = 0
    const f = () => {
      this.obj[this.prop] += delta
      if(++i >= this.frames) {
        ticker.remove(f)
        this.onFin()
      }
    }

    ticker.add(f)
  }
}