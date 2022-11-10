import { Router } from 'express'
import RTKController from 'src/refresh-token/api/RTKController'

export default class RTKRoutes {
  public router = Router()
  private controller = new RTKController()

  constructor() {
    this.rootRouter()
  }

  private rootRouter = () => {
    this.router.route('/').post(this.controller.refresh)
  }
}
