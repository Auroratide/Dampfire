import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import PlayState from './PlayState'
import MenuState from './MenuState'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  // const state = new PlayState(renderer, ticker, resources)
  const state = new MenuState(renderer, ticker, resources)

  stage.addChild(state)

  state.start()
}