import * as PIXI from 'pixi.js'
import { Resources } from './aliases.js'
import Campfire from './Campfire'

export default (stage: PIXI.Container) => (loader: PIXI.Loader, resources: Resources) => {
  const campfire = new Campfire(resources)

  stage.addChild(campfire)
}