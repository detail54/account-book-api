import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import RTKChangeService from '../service/RTKChangeService'
import RTKRetireveService from '../service/RTKRetireveService'
import JWToken from '../../core/utils/JWToken'
import UserDto from 'src/user/dto/UserDto'

export default class RTKController {
  private jwt = new JWToken()
  private rtkChangeService = new RTKChangeService()
  private rtkRetireveService = new RTKRetireveService()

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
              const newRefreshToken = await this.rtkChangeService.register(refreshTokenData.user)
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
