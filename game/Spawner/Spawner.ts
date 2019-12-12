import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Bucket from '../Bucket'

export default class Spawner extends PIXI.Container {
  private ticker: PIXI.Ticker
  private resources: Resources
  private totalElapsed = 0
  constructor(ticker: PIXI.Ticker, resources: Resources) {
    super()
    this.ticker = ticker
    this.resources = resources
  }

  start = () => this.ticker.add(this.loop)
  stop = () => this.ticker.remove(this.loop)

  private loop = (dt: number) => {
    this.totalElapsed += 0.01 * dt
    if(this.totalElapsed > 3) {
      this.totalElapsed = 0
      const bucket = new Bucket(this.resources)
      bucket.x = Math.random() * 480
      bucket.y = Math.random() * 480

      this.addChild(bucket)
    }
  }
}