import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import Positioning from './tools/Positioning'
import Campfire from './Campfire'
import Light from './Light'
import Ground from './Ground'
import Spawner from './Spawner'
import Health from './domain/Health'

export default (stage: PIXI.Container, renderer: PIXI.Renderer, ticker: PIXI.Ticker) => (loader: PIXI.Loader, resources: Resources) => {
  const positioning = new Positioning(renderer)
  const health = new Health(100, 100)

  const ground = new Ground(resources, renderer)
  const campfire = new Campfire(resources)
  const light = new Light(renderer, ticker, health)

  const spawner = new Spawner(ticker, resources, campfire, health)

  positioning.center(campfire)
  positioning.center(light)

  stage.addChild(ground)
  stage.addChild(campfire)
  stage.addChild(spawner)
  stage.addChild(light)

  stage.mask = light

  spawner.start()
}