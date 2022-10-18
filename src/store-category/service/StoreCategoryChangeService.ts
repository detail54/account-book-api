import StoreCategoryRegistDto from '../dto/StoreCategoryRegistDto'
import StoreCategoryRepository from '../repository/StoreCategoryRepository'

export default class StoreCategoryChangeService {
  /**
   *
   * @param newStoreCategory 새 카테고리 데이터
   */
  public register = async (newStoreCategory: StoreCategoryRegistDto) => {
    await StoreCategoryRepository.create({
      ...newStoreCategory,
    })
  }
}
