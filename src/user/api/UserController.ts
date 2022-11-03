import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import UserChangeService from '../service/UserChangeService'
import UserRetireveService from '../service/UserRetireveService'
import UserRegistDto from '../dto/UserRegistDto'
import UserTokenService from '../service/UserTokenService'
import UserSignInDto from '../dto/UserSignInDto'

export default class UserController {
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()
  private userTokenService: UserTokenService = new UserTokenService()

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
      const users = await this.userRetireveService.get(req.params.userName)

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
   * -- 새 유저 등록 --
   * @param req 요청
   * @param res 응답
   * @param next 다음 함수 호출
   * @returns res 객체
   */
  public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const user: UserRegistDto = req.body
      await this.userChangeService.register(user)
    } catch (e) {
      next()
      throw e
    }

    res.status(httpStatus.CREATED).send(httpStatus.getStatusText(res.statusCode))
    return res
  }

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const userInfo: UserSignInDto = req.body
      const token = await this.userTokenService.getJwtToken(userInfo)

      if (!token) {
        res.status(httpStatus.NO_CONTENT)
      } else {
        res.status(httpStatus.OK)
        res.header('Access-Token', token)
      }

      res.send(token)
    } catch (e) {
      next()
      throw e
    }

    return res
  }
}
