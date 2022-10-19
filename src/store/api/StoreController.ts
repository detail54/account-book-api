import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import StoreChangeService from '../service/StoreChangeService'
import StoreRetireveService from '../service/StoreRetireveService'
import StoreCategoryRetireveService from '../../store-category/service/StoreCategoryRetireveService'
import StoreCategoryChangeService from '../../store-category/service/StoreCategoryChangeService'
import StoreRegistDto from '../dto/StoreRegistDto'

export default class StoreController {
  private storeRetireveService: StoreRetireveService = new StoreRetireveService()
  private storeChangeService: StoreChangeService = new StoreChangeService()
  private storeCategoryRetireveService: StoreCategoryRetireveService = new StoreCategoryRetireveService()
  private storeCategoryChangeService: StoreCategoryChangeService = new StoreCategoryChangeService()

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeList = await this.storeRetireveService.getList()

      if (_.isEmpty(storeList)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(storeList)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const store = await this.storeRetireveService.get(req.params.name)

      if (_.isEmpty(store)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(store)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const retirevedCategory = await this.storeCategoryRetireveService.get(req.body.categoryName)

      if (_.isEmpty(retirevedCategory)) {
        await this.storeCategoryChangeService.register(req.body.categoryName)
      }

      const category = await this.storeCategoryRetireveService.get(req.body.categoryName)

      if (category) {
        const registStoreData: StoreRegistDto = { ...req.body, category }
        await this.storeChangeService.register(registStoreData)

        const store = await this.storeRetireveService.get(registStoreData.name)

        if (store) {
          category.stores.push(store)
        }

        await this.storeCategoryChangeService.updater(category)
      }
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
