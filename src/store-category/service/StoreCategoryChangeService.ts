import StoreCategoryDto from '../dto/StoreCategoryDto'
import StoreCategoryRegistDto from '../dto/StoreCategoryRegistDto'
import StoreCategoryRepository from '../repository/StoreCategoryRepository'

export default class StoreCategoryChangeService {
  /**
   *
   * @param newStoreCategory 새 카테고리 데이터
   */
  public register = async (newStoreCategory: StoreCategoryRegistDto): Promise<void> => {
    await StoreCategoryRepository.create({
      ...newStoreCategory,
    })
  }

  public updater = async (updateStoreCategory: StoreCategoryDto): Promise<void> => {
    const id = updateStoreCategory._id
    await StoreCategoryRepository.findByIdAndUpdate(id, { ...updateStoreCategory })
  }
}
