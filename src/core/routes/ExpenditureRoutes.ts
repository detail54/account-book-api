import { Router } from 'express'
import ExpenditureController from '../../expenditure/api/ExpenditureController'

export default class ExpenditureRoutes {
  public router = Router()
  private controller = new ExpenditureController()

  constructor() {
    this.rootRouter()
  }

  private rootRouter = () => {
    this.router.route('/').get(this.controller.getList).post(this.controller.register)
  }
}
