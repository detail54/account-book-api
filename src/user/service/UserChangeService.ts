import EncryptPW from '../../core/utils/EncryptPW'
import UserDto from '../dto/UserDto'
import UserRegistDto from '../dto/UserRegistDto'
import UserRepository from '../repository/UserRepository'

export default class UserChangeService {
  /**
   *
   * @param newUser 유저 정보
   */
  public register = async (newUser: UserRegistDto): Promise<void> => {
    const date = new Date()
    const count = `${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 9) + 1}`
    const encrypt = new EncryptPW(newUser.password, count)
    await encrypt.base64crypto()

    const salt = await encrypt.getSalt()
    const encryptPW = await encrypt.getEncryptPw()

    await UserRepository.create({
      userName: newUser.userName,
      password: encryptPW,
      salt,
      keyCount: count,
      incomes: [],
      accounts: [],
      regDt: date,
      updateDt: date,
    })
  }

  public updater = async (updateUser: UserDto): Promise<void> => {
    const id = updateUser._id
    await UserRepository.findByIdAndUpdate(id, {
      ...updateUser,
      updateDt: new Date(),
    })
  }
}
