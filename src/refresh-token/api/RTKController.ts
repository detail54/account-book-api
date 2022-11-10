import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import RTKChangeService from '../service/RTKChangeService'
import RTKRetireveService from '../service/RTKRetireveService'
import UserRetireveService from '../../user/service/UserRetireveService'
import JWToken from '../../core/utils/JWToken'

export default class RTKController {
  private jwt = new JWToken()
  private rtkChangeService = new RTKChangeService()
  private rtkRetireveService = new RTKRetireveService()
  private userRetireveService = new UserRetireveService()

  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const refreshKey = req.cookies['Refresh-Key']

    if (refreshKey) {
      const refreshTokenData = await this.rtkRetireveService.get(refreshKey)

      if (refreshTokenData) {
        try {
          await this.jwt.verify(refreshTokenData.token, 'rtk', async (err, decoded) => {
            const newAccessToken = await this.jwt.createAccessToken(JSON.parse(JSON.stringify(refreshTokenData)))

            const setRes = (refreshTokenId: string): void => {
              res.status(httpStatus.OK)
              res.header('Set-Cookie', [
                `Refresh-Key=${refreshTokenId}; HttpOnly`,
                `Access-Token=${newAccessToken}; HttpOnly`,
              ])
              res.end()
            }

            if (err) {
              const user = await this.userRetireveService.get(refreshTokenData.userId)
              const newRefreshToken = await this.rtkChangeService.register(user!)

              setRes(newRefreshToken._id)
            } else {
              setRes(refreshTokenData._id)
            }
          })
        } catch (e) {
          next()
          throw e
        }
      }
    }

    res.status(httpStatus.UNAUTHORIZED)
    res.end()

    return res
  }
}
