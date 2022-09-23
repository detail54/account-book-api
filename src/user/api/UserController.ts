import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import UserChangeService from '../service/UserChangeService'
import UserRetireveService from '../service/UserRetireveService'

export default class UserController {
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()

  public getList = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const users = await this.userRetireveService.getList()

      if (_.isEmpty(users)) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
      }

      res.send(users)
    } catch (e) {
      next()
      throw e
    }

    return res
  }
}
