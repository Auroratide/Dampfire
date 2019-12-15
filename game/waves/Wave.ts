import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Bucket from '../Bucket'
import Logs from '../Logs'
import TargetObject from '../movement/TargetObject'
import Campfire from '../Campfire'
import Health from '../domain/Health'
import Positioning from '../tools/Positioning'
import Spawner from '../Spawner'
import sec from '../tools/sec'
import Score from '../domain/Score'

export default class Wave extends PIXI.Container {
  private ticker: PIXI.Ticker
  private resources: Resources
  private campfire: Campfire
  private health: Health
  private positioning: Positioning
  private score: Score

  private slowSpawner: Spawner
  private fastSpawner: Spawner
  private logSpawner: Spawner
  constructor(ticker: PIXI.Ticker, resources: Resources, campfire: Campfire, health: Health, positioning: Positioning, score: Score) {
    super()
    this.ticker = ticker
    this.resources = resources
    this.campfire = campfire
    this.health = health
    this.positioning = positioning
    this.score = score

    this.slowSpawner = new Spawner()
      .startingAt(sec(0)).endingAt(sec(15))
      .every(sec(1.5), sec(2.5))
      .spawn(this.makeBucket)
    
    this.fastSpawner = new Spawner()
      .startingAt(sec(15)).endingAt(sec(30))
      .every(sec(0.75), sec(1.25))
      .spawn(this.makeBucket)
    
    this.logSpawner = new Spawner()
      .startingAt(sec(15)).endingAt(sec(30))
      .every(sec(1.5), sec(2.5))
      .spawn(this.makeLog)
  }

  start = () => this.ticker.add(this.loop)
  stop = () => this.ticker.remove(this.loop)

  destroy() {
    this.stop()
    super.destroy({ children: true })
  }

  private loop = (dt: number) => {
    this.slowSpawner.update(dt)
    this.fastSpawner.update(dt)
    this.logSpawner.update(dt)
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