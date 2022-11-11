import UserRepository from '../repository/UserRepository'
import UserDto from '../dto/UserDto'
import UserSignInDto from '../dto/UserSignInDto'
import EncryptPW from 'src/core/utils/EncryptPW'

/**
 * 사용자 조회 서비스
 */
export default class UserRetireveService {
  /**
   * @returns 사용자 데이터 리스트
   */
  public getList = async (): Promise<UserDto[]> => {
    return await UserRepository.find()
  }

  /**
   * @param userName 사용자 id
   * @returns 사용자 데이터
   */
  public get = async (_id: string): Promise<UserDto | null> => {
    return await UserRepository.findById(_id)
  }

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
          retireveUser.regDt,
          retireveUser.updateDt,
        )
      }
    }
  }
}
