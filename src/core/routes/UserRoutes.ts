import { Router } from 'express'
import UserController from 'src/user/api/UserController'

export default class UserRoutes {
  public router = Router()
  private controller = new UserController()

  constructor() {
    this.rootRouter()
    this.idPathRouter()
    this.signInRouter()
  }

  private rootRouter = () => {
    this.router.route('/').get(this.controller.getList).post(this.controller.register).delete(this.controller.delete)
  }

  private idPathRouter = () => {
    this.router.route('/:id').get(this.controller.get)
  }

  private signInRouter = () => {
    this.router.route('/signin').post(this.controller.signIn)
  }
}
