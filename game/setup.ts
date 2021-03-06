import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import StateManager from './states/StateManager'
import PlayState from './states/PlayState'
import MenuState from './states/MenuState'
import GameOverState from './states/GameOverState'
import Save from './domain/Save'
import SoundManager from './SoundManager'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  const save = new Save(window.localStorage)
  const sfx = new SoundManager()

  const stateManager = new StateManager()
  const play = new PlayState(renderer, ticker, resources, stateManager, save, sfx)
  const menu = new MenuState(renderer, ticker, resources, stateManager, save, sfx)
  const gameOver = new GameOverState(renderer, ticker, resources, stateManager, save, sfx)
  stateManager.register('play', play)
  stateManager.register('menu', menu)
  stateManager.register('game over', gameOver)

  stage.addChild(menu)
  stage.addChild(play)
  stage.addChild(gameOver)

  // stateManager.firstState('menu')
  stateManager.firstState('menu')
}