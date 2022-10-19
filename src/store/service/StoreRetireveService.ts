import StoreDto from '../dto/StoreDto'
import StoreRepository from '../repository/StoreRepository'

/**
 * 가맹점 조회
 */
export default class StoreRetireveService {
  /**
   *
   * @returns 가맹점 데이터 리스트
   */
  public getList = async (): Promise<StoreDto[]> => {
    return await StoreRepository.find().populate('category')
  }

  /**
   * @param name 가맹점 명
   * @returns 가맹점 데이터
   */
  public get = async (name: string): Promise<StoreDto | null> => {
    return await StoreRepository.findOne({ name }).populate('category')
  }
}
