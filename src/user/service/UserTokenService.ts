import EncryptPW from '../../core/utils/EncryptPW'
import UserDto from '../dto/UserDto'
import UserSignInDto from '../dto/UserSignInDto'
import UserRepository from '../repository/UserRepository'

export default class UserTokenService {
  /**
   * @param user 로그인 유저 id, pw
   * @returns 로그인 토큰
   */
  public signIn = async (user: UserSignInDto): Promise<UserDto | undefined> => {
    const retireveUser = await UserRepository.findOne({ userName: user.userName })
    if (retireveUser) {
      const encrypt = new EncryptPW(user.password, retireveUser.keyCount.toString(), retireveUser.salt.toString())

      await encrypt.base64crypto()

      const encryptPw = await encrypt.getEncryptPw()

      if (encryptPw === retireveUser.password) {
        return new UserDto(
          retireveUser._id.toString(),
          retireveUser.userName.toString(),
          retireveUser.password.toString(),
          retireveUser.salt.toString(),
          retireveUser.keyCount.toString(),
          retireveUser.incomes,
          retireveUser.expenditures,
          retireveUser.regDt,
          retireveUser.updateDt,
        )
      }
    }
  }
}
