import ExpenditureRegistDto from '../dto/ExpenditureRegistDto'
import ExpenditureRepository from '../repository/ExpenditureRepository'

export default class ExpenditureChangeService {
  public register = async (newExpenditure: ExpenditureRegistDto): Promise<void> => {
    await ExpenditureRepository.create({
      ...newExpenditure,
    })
  }
}
