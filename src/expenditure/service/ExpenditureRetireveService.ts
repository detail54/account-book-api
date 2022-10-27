import StoreDto from 'src/store/dto/StoreDto'
import UserDto from 'src/user/dto/UserDto'
import ExpenditureDto from '../dto/ExpenditureDto'
import ExpenditureRepository from '../repository/ExpenditureRepository'

export default class ExpenditureRetireveService {
  public getList = async (user: UserDto): Promise<ExpenditureDto[]> => {
    return await ExpenditureRepository.find({ user })
  }

  public get = async (user: UserDto, store: StoreDto, paymentDt: Date): Promise<ExpenditureDto | null> => {
    return await ExpenditureRepository.findOne({
      user,
      store,
      paymentDt,
    })
  }

  public getListByMonth = async (user: UserDto, date: Date): Promise<ExpenditureDto[]> => {
    return await ExpenditureRepository.find()
  }
}
