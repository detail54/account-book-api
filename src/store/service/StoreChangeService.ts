import StoreRepository from '../repository/StoreRepository'
import StoreRegistDto from '../dto/StoreRegistDto'
import StoreDto from '../dto/StoreDto'

export default class StoreChangeService {
  /**
   *
   * @param newStore 새 가맹점 데이터
   */
  public register = async (newStore: StoreRegistDto): Promise<void> => {
    await StoreRepository.create({
      ...newStore,
    })
  }

  public updater = async (updateStore: StoreDto): Promise<void> => {
    const id = updateStore._id
    await StoreRepository.findByIdAndUpdate(id, { ...updateStore })
  }
}
