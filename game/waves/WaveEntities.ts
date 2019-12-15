import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Campfire from '../Campfire'
import Health from '../domain/Health'
import Positioning from '../tools/Positioning'
import Score from '../domain/Score'
import Bucket from '../Bucket'
import Logs from '../Logs'
import TargetObject from '../movement/TargetObject'

export default class WaveEntities extends PIXI.Container {
  private ticker: PIXI.Ticker
  private resources: Resources
  private campfire: Campfire
  private health: Health
  private positioning: Positioning
  private score: Score
  constructor(ticker: PIXI.Ticker, resources: Resources, campfire: Campfire, health: Health, positioning: Positioning, score: Score) {
    super()
    this.ticker = ticker
    this.resources = resources
    this.campfire = campfire
    this.health = health
    this.positioning = positioning
    this.score = score
  }

  clear = () => {
    this.removeChildren().forEach(child => child.destroy())
  }

  destroy() {
    this.clear()
    super.destroy()
  }

  makeBucket = () => {
    const bucket = new Bucket(this.resources, this.ticker, new TargetObject(1, this.campfire), this.campfire, this.health, this.score)
    this.positioning.randomOffScreen(bucket)
    this.addChild(bucket)
  }

  makeLog = () => {
    const logs = new Logs(this.resources, this.ticker, new TargetObject(1, this.campfire), this.campfire, this.health)
    this.positioning.randomOffScreen(logs)
    this.addChild(logs)
  }
}
