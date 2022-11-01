import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import MESSAGE from '../../core/constant/MESSAGE'
import ExpenditureRetireveService from '../service/ExpenditureRetireveService'
import ExpenditureChangeService from '../service/ExpenditureChangeService'
import UserRetireveService from '../../user/service/UserRetireveService'
import UserChangeService from '../../user/service/UserChangeService'
import StoreCategoryChangeService from '../../store-category/service/StoreCategoryChangeService'
import StoreCategoryRetireveService from '../../store-category/service/StoreCategoryRetireveService'
import StoreChangeService from '../../store/service/StoreChangeService'
import StoreRetireveService from '../../store/service/StoreRetireveService'

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
      const user = await this.userRetireveService.get(req.body.userName)

      if (user) {
        let category = await this.storeCategoryRetireveService.get(req.body.categoryName)
        let store = await this.storeRetireveService.get(req.body.storeName)

        if (!category) {
          await this.storeCategoryChangeService.register({
            name: req.body.categoryName,
            stores: [],
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
          if (!category.stores.find((storeData) => storeData.name === store?.name)) {
            category.stores.push(store)
            await this.storeCategoryChangeService.updater(category)
          }

          await this.expenditureChangeService.register({
            user,
            category,
            store,
            paymentDt: req.body.paymentDt,
            amount: req.body.amount,
            memo: req.body.memo,
          })

          const expenditure = await this.expenditureRetireveService.get(user, store, req.body.paymentDt)

          if (expenditure) {
            store.expenditures.push(expenditure)
            user.expenditures.push(expenditure)
          }

          await this.storeChangeService.updater(store)
          await this.userChangeService.updater(user)
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
