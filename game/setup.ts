import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import Campfire from './Campfire'
import Light from './Light'
import Ground from './Ground'

export default (stage: PIXI.Container, renderer: PIXI.Renderer) => (loader: PIXI.Loader, resources: Resources) => {
  const ground = new Ground(resources, renderer)
  const campfire = new Campfire(resources)
  const light = new Light(renderer)

  stage.addChild(ground)
  stage.addChild(campfire)
  stage.addChild(light)

  stage.mask = light
}