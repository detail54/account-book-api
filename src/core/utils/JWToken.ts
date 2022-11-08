import jwt from 'jsonwebtoken'

export default class JWToken {
  public createAccessToken = async (payload: object | string): Promise<string> => {
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET!
    return jwt.sign(payload, accessTokenSecretKey, {
      expiresIn: '15m',
    })
  }

  public createRefreshToken = async (): Promise<string> => {
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET!
    return jwt.sign({}, refreshTokenSecretKey, {
      expiresIn: '14d',
    })
  }

  public verify = async (token: string, type: 'atk' | 'rtk'): Promise<string | jwt.JwtPayload> => {
    const tokenSecretKey = type === 'atk' ? process.env.ACCESS_TOKEN_SECRET! : process.env.REFRESH_TOKEN_SECRET!
    return jwt.verify(token, tokenSecretKey)
  }
}
