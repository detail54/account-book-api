import { Router } from 'express'
import UserController from '../../user/api/UserController'

export default class UserRoutes {
  public router = Router()
  private controller = new UserController()

  constructor() {
    this.rootRouter()
    this.idPathRouter()
  }

  private rootRouter = () => {
    this.router.route('/').get(this.controller.getList).post(this.controller.register)
  }

  private idPathRouter = () => {
    this.router.route('/:id').get(this.controller.get)
  }
}
