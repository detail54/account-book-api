import { NextFunction, Request, Response } from 'express'
import JWToken from '../../core/utils/JWToken'
import RTKChangeService from '../service/RTKChangeService'

export default class RTKController {
  private jwt = new JWToken()
  public rtkChangeService = new RTKChangeService()

  public refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const accessToken = req.header('Access-Token')
      if (accessToken) {
        const verify = await this.jwt.verify(accessToken, 'atk')
        console.log(verify)
      }
    } catch (e) {
      next()
      throw e
    }

    return res
  }
}
