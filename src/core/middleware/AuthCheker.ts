import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import JWToken from '../utils/JWToken'

export default class AuthChecker {
  private jwt = new JWToken()

  public cheker = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ignorePath = ['user', 'refresh']
    if (ignorePath.includes(req.path.split('/')[2])) {
      if (req.path.split('/')[2] === 'user' && req.method === 'DELETE') {
      } else {
        return next()
      }
    }

    try {
      const accessToken = req.cookies['Access-Token']

      await this.jwt.verify(accessToken, 'atk', async (err, decoded) => {
        if (!err && decoded) {
          res.locals.userId = JSON.parse(JSON.stringify(decoded))._id
          res.locals.refreshKey = req.cookies['Refresh-Key']
        }
      })
      next()
    } catch (e) {
      res.status(httpStatus.UNAUTHORIZED)
      res.end()
      throw e
    }
  }
}
