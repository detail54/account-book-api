import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import ExpenditureRetireveService from '../service/ExpenditureRetireveService'
import ExpenditureChangeService from '../service/ExpenditureChangeService'
import MESSAGE from 'src/core/constant/MESSAGE'
import StoreCategoryChangeService from 'src/store-category/service/StoreCategoryChangeService'
import StoreCategoryRetireveService from 'src/store-category/service/StoreCategoryRetireveService'
import StoreChangeService from 'src/store/service/StoreChangeService'
import StoreRetireveService from 'src/store/service/StoreRetireveService'
import UserChangeService from 'src/user/service/UserChangeService'
import UserRetireveService from 'src/user/service/UserRetireveService'

export default class ExpenditureController {
  private expenditureRetireveService: ExpenditureRetireveService = new ExpenditureRetireveService()
  private expenditureChangeService: ExpenditureChangeService = new ExpenditureChangeService()
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()
  private storeRetireveService: StoreRetireveService = new StoreRetireveService()
  private storeChangeService: StoreChangeService = new StoreChangeService()
  private storeCategoryRetireveService: StoreCategoryRetireveService = new StoreCategoryRetireveService()
  private storeCategoryChangeService: StoreCategoryChangeService = new StoreCategoryChangeService()

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user = await this.userRetireveService.get(req.params.userName)

      if (user) {
        const expenditureList = await this.expenditureRetireveService.getList(user)

        if (_.isEmpty(expenditureList)) {
          res.status(httpStatus.NO_CONTENT)
        } else {
          res.status(httpStatus.OK)
        }

        res.send(expenditureList)
      } else {
        res.status(httpStatus.NOT_FOUND)
        res.send(MESSAGE.ERROR_USER_NOT_FOUND)
      }
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user = await this.userRetireveService.get(res.locals.userId)

      if (user) {
        let category = await this.storeCategoryRetireveService.get(req.body.categoryName)
        let store = await this.storeRetireveService.get(req.body.storeName)

        if (!category) {
          await this.storeCategoryChangeService.register({
            name: req.body.categoryName,
          })

          category = await this.storeCategoryRetireveService.get(req.body.categoryName)
        }

        if (category && !store) {
          await this.storeChangeService.register({
            name: req.body.storeName,
            category,
          })

          store = await this.storeRetireveService.get(req.body.storeName)
        }

        if (category && store) {
          await this.expenditureChangeService.register({
            user,
            category,
            store,
            paymentDt: req.body.paymentDt,
            amount: req.body.amount,
            memo: req.body.memo,
          })
        }
      } else {
        res.status(httpStatus.NOT_FOUND)
        res.send(MESSAGE.ERROR_USER_NOT_FOUND)
      }
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
