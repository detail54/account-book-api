import { Router } from 'express'
import IncomeController from 'src/income/api/IncomeController'

export default class IncomeRoutes {
  public router = Router()
  private controller = new IncomeController()

  constructor() {
    this.rootRouter()
  }

  private rootRouter = () => {
    this.router.route('/').get(this.controller.getList).post(this.controller.register)
  }
}
