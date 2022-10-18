import { Router } from 'express'

export default class UserRoutes {
  public router = Router()

  constructor() {
    this.rootRouter()
  }

  private rootRouter = () => {
    this.router.route('/')
  }
}
