import jwt from 'jsonwebtoken'

export class JWTDto {
  public accessToken: string

  public refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}

export default class JWToken {
  public createAccessToken = async (payload: object | string): Promise<string> => {
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET!
    return jwt.sign(payload, accessTokenSecretKey, {
      expiresIn: '15m',
    })
  }

  public createRefreshToken = async (): Promise<string> => {
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET!
    return jwt.sign({}, accessTokenSecretKey, {
      expiresIn: '14d',
    })
  }
}
