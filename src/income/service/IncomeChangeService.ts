import IncomeRegistDto from '../dto/IncomeRegistDto'
import IncomeRepository from '../repository/IncomeRepository'

export default class IncomeChangeService {
  public register = async (newIncome: IncomeRegistDto): Promise<void> => {
    await IncomeRepository.create({
      ...newIncome,
    })
  }
}
