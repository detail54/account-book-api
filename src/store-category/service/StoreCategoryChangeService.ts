import StoreCategoryRegistDto from '../dto/StoreCategoryRegistDto'
import StoreCategoryRepository from '../repository/StoreCategoryRepository'

export default class StoreCategoryChangeService {
  public register = async (data: StoreCategoryRegistDto) => {
    await StoreCategoryRepository.create({
      ...data,
    })
  }
}
