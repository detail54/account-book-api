import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import IncomeRetireveService from '../service/IncomeRetireveService'
import IncomeChangeService from '../service/IncomeChangeService'
import UserRetireveService from '../../user/service/UserRetireveService'
import MESSAGE from '../../core/constant/MESSAGE'
import UserChangeService from '../../user/service/UserChangeService'
import IncomeRegistDto from '../dto/IncomeRegistDto'

export default class IncomeController {
  private incomeRetireveService: IncomeRetireveService = new IncomeRetireveService()
  private incomeChangeService: IncomeChangeService = new IncomeChangeService()
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      console.log(res.locals)
      const user = await this.userRetireveService.get(req.params.userName)

      if (user) {
        const incomeList = await this.incomeRetireveService.getList(user)

        if (_.isEmpty(incomeList)) {
          res.status(httpStatus.NO_CONTENT)
        } else {
          res.status(httpStatus.OK)
        }

        res.send(incomeList)
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
        const registIncomeData: IncomeRegistDto = {
          user,
          incomeDt: new Date(req.body.incomeDt),
          amount: req.body.amount,
          memo: req.body.memo,
        }

        await this.incomeChangeService.register(registIncomeData)

        const incomes = await this.incomeRetireveService.getList(user)
        user.incomes = incomes

        await this.userChangeService.updater(user)
      }
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
