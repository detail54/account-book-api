import UserRegisterDto from '../dto/UserRegisterDto'
import UserRepository from '../repository/UserRepository'

export default class UserChangeService {
  /**
   *
   * @param newUser 유저 정보
   */
  public register = async (newUser: UserRegisterDto): Promise<void> => {
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
}
