import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Bucket from '../Bucket'
import TargetObject from '../movement/TargetObject'
import Campfire from '../Campfire'
import Health from '../domain/Health'
import Positioning from '../tools/Positioning'

export default class Spawner extends PIXI.Container {
  private ticker: PIXI.Ticker
  private resources: Resources
  private campfire: Campfire
  private health: Health
  private positioning: Positioning
  private totalElapsed = 0
  constructor(ticker: PIXI.Ticker, resources: Resources, campfire: Campfire, health: Health, positioning: Positioning) {
    super()
    this.ticker = ticker
    this.resources = resources
    this.campfire = campfire
    this.health = health
    this.positioning = positioning
  }

  start = () => this.ticker.add(this.loop)
  stop = () => this.ticker.remove(this.loop)

  private loop = (dt: number) => {
    this.totalElapsed += 0.01 * dt
    if(this.totalElapsed > 3) {
      this.totalElapsed = 0
      const bucket = new Bucket(this.resources, this.ticker, new TargetObject(1, this.campfire), this.campfire, this.health)
      this.positioning.randomOffScreen(bucket)

      this.addChild(bucket)
    }
  }
}