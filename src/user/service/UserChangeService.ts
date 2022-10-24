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
    await UserRepository.create({
      userName: newUser.userName,
      password: newUser.password,
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
