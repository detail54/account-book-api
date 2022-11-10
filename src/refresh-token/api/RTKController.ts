import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import UserTokenDataDto from 'src/user/dto/UserTokenDataDto'
import RTKChangeService from '../service/RTKChangeService'
import RTKRetireveService from '../service/RTKRetireveService'
import UserRetireveService from 'src/user/service/UserRetireveService'
import JWToken from 'src/core/utils/JWToken'
import UserDto from 'src/user/dto/UserDto'

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
            const user = await this.userRetireveService.get(refreshTokenData.userId)
            const userParseData: UserDto = JSON.parse(JSON.stringify(user))
            const tokenUserInfo: UserTokenDataDto = {
              _id: userParseData._id,
              userName: userParseData.userName,
              regDt: userParseData.regDt,
            }
            const newAccessToken = await this.jwt.createAccessToken(tokenUserInfo)

            const setRes = (refreshTokenId: string): void => {
              res.status(httpStatus.OK)
              res.header('Set-Cookie', [
                `Refresh-Key=${refreshTokenId}; Path=/; HttpOnly`,
                `Access-Token=${newAccessToken}; Path=/; HttpOnly`,
              ])
              res.end()
            }

            if (err) {
              const newRefreshToken = await this.rtkChangeService.register(userParseData)

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
