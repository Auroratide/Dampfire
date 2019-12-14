import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import StateManager from './states/StateManager'
import PlayState from './states/PlayState'
import MenuState from './states/MenuState'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  const stateManager = new StateManager()
  const play = new PlayState(renderer, ticker, resources)
  const menu = new MenuState(renderer, ticker, resources, stateManager)
  stateManager.register('play', play)
  stateManager.register('menu', menu)

  stage.addChild(menu)
  stage.addChild(play)

  stateManager.firstState('menu')
}