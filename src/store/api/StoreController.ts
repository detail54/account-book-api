import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import StoreChangeService from '../service/StoreChangeService'
import StoreRetireveService from '../service/StoreRetireveService'
import StoreCategoryChangeService from 'src/store-category/service/StoreCategoryChangeService'
import StoreCategoryRetireveService from 'src/store-category/service/StoreCategoryRetireveService'
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
      const category = await this.storeCategoryRetireveService.get(req.body.categoryName)

      if (category) {
        const registStoreData: StoreRegistDto = { ...req.body, category }
        await this.storeChangeService.register(registStoreData)
      }
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
