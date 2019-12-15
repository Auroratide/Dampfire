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
      default: throw 'BAD WAVE NUMBER?'
    }
  }
}