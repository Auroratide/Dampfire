import * as PIXI from 'pixi.js'
import WaveFactory from "./WaveFactory";
import Wave from './Wave'

export default class WaveDriver {
  private ticker: PIXI.Ticker
  private waveFactory: WaveFactory
  private currentWave: Wave
  private currentWaveNumber: number = 1
  constructor(ticker: PIXI.Ticker, waveFactory: WaveFactory) {
    this.ticker = ticker
    this.waveFactory = waveFactory
  }

  start = () => {
    this.currentWave = this.waveFactory.wave(this.currentWaveNumber)
    this.ticker.add(this.loop)
    this.currentWave.start()
  }

  stop = () => {
    this.currentWave.stop()
    this.ticker.remove(this.loop)
  }
  
  private loop = () => {
    if(this.currentWave.isDone()) {
      this.advanceWave()
    }
  }

  private advanceWave = () => {
    this.currentWave.stop()
    this.currentWaveNumber += 1
    this.currentWave = this.waveFactory.wave(this.currentWaveNumber)
    this.currentWave.start()
  }
}