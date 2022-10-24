import StoreRepository from '../repository/StoreRepository'
import StoreRegistDto from '../dto/StoreRegistDto'

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
}
