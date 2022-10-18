import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import StoreCategoryChangeService from '../service/StoreCategoryChangeService'
import StoreCategoryRetireveService from '../service/StoreCategoryRetireveService'
import StoreCategoryRegistDto from '../dto/StoreCategoryRegistDto'

export default class StoreCategoryController {
  private storeCategoryRetireveService: StoreCategoryRetireveService = new StoreCategoryRetireveService()
  private storeCategoryChangeService: StoreCategoryChangeService = new StoreCategoryChangeService()

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategoryList = await this.storeCategoryRetireveService.getList()

      if (_.isEmpty(storeCategoryList)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(storeCategoryList)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategory = await this.storeCategoryRetireveService.get(req.params.id)

      if (_.isEmpty(storeCategory)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(storeCategory)
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const storeCategory: StoreCategoryRegistDto = req.body
      await this.storeCategoryChangeService.register(storeCategory)
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
