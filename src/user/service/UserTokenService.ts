import EncryptPW from '../../core/utils/EncryptPW'
import UserSignInDto from '../dto/UserSignInDto'
import UserTokenDto from '../dto/UserTokenDto'
import UserRepository from '../repository/UserRepository'
import JWToken, { JWTDto } from '../../core/utils/JWToken'

export default class UserTokenService {
  /**
   * @param user 로그인 유저 id, pw
   * @returns 로그인 토큰
   */
  public signIn = async (user: UserSignInDto): Promise<JWTDto | undefined> => {
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

        const token = new JWToken()
        const accessToken = await token.createAccessToken(tokenUserInfo)
        const refreshToken = await token.createRefreshToken()

        return new JWTDto(accessToken, refreshToken)
      }
    }
  }
}
