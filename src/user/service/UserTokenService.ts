import EncryptPW from '../../core/utils/EncryptPW'
import UserDto from '../dto/UserDto'
import UserSignInDto from '../dto/UserSignInDto'
import UserTokenDto from '../dto/UserTokenDto'
import UserRepository from '../repository/UserRepository'
import jwt from 'jsonwebtoken'

export default class UserTokenService {
  /**
   * @param user 로그인 유저 id, pw
   * @returns 로그인 토큰
   */
  public getJwtToken = async (user: UserSignInDto): Promise<string | undefined> => {
    const retireveUser = await UserRepository.findOne({ userName: user.userName })
    if (retireveUser) {
      const encrypt = new EncryptPW(user.password, retireveUser.keyCount.toString(), retireveUser.salt.toString())

      await encrypt.base64crypto()

      const encryptPw = await encrypt.getEncryptPw()

      if (encryptPw === retireveUser.password) {
        const tokenUserInfo: UserTokenDto = {
          _id: retireveUser._id.toString(),
          userName: retireveUser.userName.toString(),
          regDt: retireveUser.regDt,
        }

        const secretKey = process.env.ACCESS_TOKEN_SECRET!
        const jwtToken = jwt.sign(tokenUserInfo, secretKey, {
          expiresIn: '15m',
        })

        return jwtToken
      }
    }
  }

  public refreshToken = async (user: UserDto, token: string): Promise<string | undefined> => {
    return ''
  }
}
