import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import PlayState from './PlayState'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  const playState = new PlayState(renderer, ticker, resources)

  stage.addChild(playState)

  playState.start()
}