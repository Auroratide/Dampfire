import WaveFactory from "./WaveFactory";

export default class WaveDriver {
  private waveFactory: WaveFactory
  constructor(waveFactory: WaveFactory) {
    this.waveFactory = waveFactory
  }

  start = () => this.waveFactory.wave(1).start()
}