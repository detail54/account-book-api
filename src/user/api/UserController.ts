import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import UserChangeService from '../service/UserChangeService'
import UserRetireveService from '../service/UserRetireveService'
import UserRegisterDto from '../dto/UserRegisterDto'

export default class UserController {
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()

  /**
   * -- 전체 사용자 리스트 조회 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
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

  /**
   * -- 특정 사용자 조회 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public get = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const users = await this.userRetireveService.get(req.params.id)

      if (_.isUndefined(users)) {
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

  /**
   *
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user: UserRegisterDto = req.body
      await this.userChangeService.register(user)
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }
}
