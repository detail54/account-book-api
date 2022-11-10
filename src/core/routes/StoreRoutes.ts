import { Router } from 'express'
import StoreController from 'src/store/api/StoreController'

export default class StoreRoutes {
  public router = Router()
  private controller = new StoreController()

  constructor() {
    this.rootRouter()
    this.idPathRouter()
  }

  private rootRouter = () => {
    this.router.route('/').get(this.controller.getList).post(this.controller.register)
  }

  private idPathRouter = () => {
    this.router.route('/:name').get(this.controller.get)
  }
}
