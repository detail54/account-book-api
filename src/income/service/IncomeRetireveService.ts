import UserDto from 'src/user/dto/UserDto'
import IncomeDto from '../dto/IncomeDto'
import IncomeRepository from '../repository/IncomeRepository'

export default class IncomeRetireveService {
  public getList = async (user: UserDto): Promise<IncomeDto[]> => {
    return await IncomeRepository.find({ user })
  }
}
