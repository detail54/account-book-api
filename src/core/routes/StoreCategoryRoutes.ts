import { Router } from 'express'
import StoreCategoryController from '../../store-category/api/StoreCategoryController'

export default class StoreCategoryRoutes {
  public router = Router()
  private controller = new StoreCategoryController()

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