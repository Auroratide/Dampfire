import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import Positioning from './tools/Positioning'
import Campfire from './Campfire'
import Light from './Light'
import Ground from './Ground'
import Spawner from './Spawner'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  const positioning = new Positioning(renderer)

  const ground = new Ground(resources, renderer)
  const campfire = new Campfire(resources)
  const light = new Light(renderer)

  const spawner = new Spawner(ticker, resources)

  positioning.center(campfire)

  stage.addChild(ground)
  stage.addChild(campfire)
  stage.addChild(spawner)
  stage.addChild(light)

  stage.mask = light

  spawner.start()
}