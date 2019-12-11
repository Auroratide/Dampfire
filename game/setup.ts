import * as PIXI from 'pixi.js'
import Campfire from './Campfire'

export default (app: PIXI.Application) => () => {
  const campfire = new Campfire(app)

  app.stage.addChild(campfire)
}