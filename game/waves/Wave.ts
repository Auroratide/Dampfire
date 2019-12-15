import * as PIXI from 'pixi.js'
import Spawner from '../Spawner'

export default class Wave {
  private ticker: PIXI.Ticker
  private spawners: Spawner[]
  constructor(ticker: PIXI.Ticker, spawners: Spawner[]) {
    this.ticker = ticker
    this.spawners = spawners
  }

  start = () => this.ticker.add(this.loop)
  stop = () => this.ticker.remove(this.loop)

  private loop = (dt: number) => {
    this.spawners.forEach(spawner => spawner.update(dt))
  }
}
