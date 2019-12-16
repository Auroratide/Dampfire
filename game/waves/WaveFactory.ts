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
          .every(sec(1.25), sec(2.25))
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

      case 3: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(1), sec(2))
          .spawn(this.waveEntities.makeBottle),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(3), sec(4))
          .spawn(this.waveEntities.makeLog)
      ])

      case 4: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(0.75), sec(1.75))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(3), sec(5))
          .spawn(this.waveEntities.makeLog),
        new Spawner()
          .startingAt(sec(10)).endingAt(sec(20))
          .every(sec(1.5), sec(2.5))
          .spawn(this.waveEntities.makeBottle)
      ])

      case 5: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(0.75), sec(1.75))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(3), sec(5))
          .spawn(this.waveEntities.makeLog),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(1.75), sec(2.75))
          .spawn(this.waveEntities.makeBottle)
      ])

      case 6: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(0.5), sec(1.25))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(3), sec(5))
          .spawn(this.waveEntities.makeLog),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(20))
          .every(sec(1.5), sec(2.5))
          .spawn(this.waveEntities.makeBottle)
      ])

      case 7: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(0.5), sec(1))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(2.5), sec(4.5))
          .spawn(this.waveEntities.makeLog),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(1), sec(2))
          .spawn(this.waveEntities.makeBottle)
      ])

      default: return new Wave(this.ticker, [
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(0.5), sec(0.75))
          .spawn(this.waveEntities.makeBucket),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(2), sec(4))
          .spawn(this.waveEntities.makeLog),
        new Spawner()
          .startingAt(sec(0)).endingAt(sec(30))
          .every(sec(1), sec(1.25))
          .spawn(this.waveEntities.makeBottle)
      ])
    }
  }
}