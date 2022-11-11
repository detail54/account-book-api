import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import httpStatus from 'http-status-codes'
import UserRegistDto from '../dto/UserRegistDto'
import UserSignInDto from '../dto/UserSignInDto'
import UserTokenDataDto from '../dto/UserTokenDataDto'
import UserChangeService from '../service/UserChangeService'
import UserRetireveService from '../service/UserRetireveService'
import RTKChangeService from 'src/refresh-token/service/RTKChangeService'
import JWToken from 'src/core/utils/JWToken'

export default class UserController {
  private userRetireveService: UserRetireveService = new UserRetireveService()
  private userChangeService: UserChangeService = new UserChangeService()
  private rtkChangeService: RTKChangeService = new RTKChangeService()

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

  /**
   * -- 로그인(토큰발급) --
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const userInfo: UserSignInDto = req.body
      const signInUser = await this.userRetireveService.signIn(userInfo)

      if (!signInUser) {
        res.status(httpStatus.UNAUTHORIZED)
      } else {
        const tokenUserInfo: UserTokenDataDto = {
          _id: signInUser._id,
          userName: signInUser.userName,
          regDt: signInUser.regDt,
        }

        const accessToken = await new JWToken().createAccessToken(tokenUserInfo)
        const refreshTokenKey = await this.rtkChangeService.register(signInUser)

        res.status(httpStatus.OK)
        res.header('Set-Cookie', [
          `Refresh-Key=${refreshTokenKey._id}; Path=/; HttpOnly`,
          `Access-Token=${accessToken}; Path=/; HttpOnly`,
        ])
        res.end()
      }
    } catch (e) {
      next()
      throw e
    }

    return res
  }

  /**
   * -- 유저 삭제 --
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      await this.userChangeService.delete(res.locals.userId)
      await this.rtkChangeService.delete(res.locals.refreshKey)

      res.status(httpStatus.OK)
      res.clearCookie('Access-Token')
      res.clearCookie('Refresh-Key')
      res.end()
    } catch (e) {
      next()
      throw e
    }

    return res
  }
}
