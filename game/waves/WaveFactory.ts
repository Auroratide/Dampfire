import * as PIXI from 'pixi.js'
import Wave from './Wave'
import Spawner from '../Spawner'
import sec from '../tools/sec'
import WaveEntities from './WaveEntities'

export default class WaveFactory {
  private ticker: PIXI.Ticker
  private waveEntities: WaveEntities
  constructor(ticker: PIXI.Ticker, waveEntities: WaveEntities) {
    this.ticker = ticker
    this.waveEntities = waveEntities
  }

  wave = (n: number) => {
    switch(n) {
      case 1: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(15))
          .every(sec(1.5), sec(2.5))
          .spawn(this.waveEntities.makeBucket)
      ])

      case 2: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(1), sec(2))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(2.5), sec(3.5))
          .spawn(this.waveEntities.makeLog)
      ])

      default: throw 'BAD WAVE NUMBER?'
    }
  }
}