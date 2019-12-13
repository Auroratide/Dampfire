import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Bucket from '../Bucket'
import TargetObject from '../movement/TargetObject'
import Campfire from '../Campfire'

export default class Spawner extends PIXI.Container {
  private ticker: PIXI.Ticker
  private resources: Resources
  private campfire: Campfire
  private totalElapsed = 0
  constructor(ticker: PIXI.Ticker, resources: Resources, campfire: Campfire) {
    super()
    this.ticker = ticker
    this.resources = resources
    this.campfire = campfire
  }

  start = () => this.ticker.add(this.loop)
  stop = () => this.ticker.remove(this.loop)

  private loop = (dt: number) => {
    this.totalElapsed += 0.01 * dt
    if(this.totalElapsed > 3) {
      this.totalElapsed = 0
      const bucket = new Bucket(this.resources, this.ticker, new TargetObject(1, this.campfire))
      bucket.x = Math.random() * 480
      bucket.y = Math.random() * 480

      this.addChild(bucket)
    }
  }
}