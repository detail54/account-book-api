import StoreCategoryDto from '../dto/StoreCategoryDto'
import StoreCategoryRepository from '../repository/StoreCategoryRepository'

/**
 * 카테고리 조회
 */
export default class StoreCategoryRetireveService {
  /**
   * @returns 카테고리 데이터 리스트
   */
  public getList = async (): Promise<StoreCategoryDto[]> => {
    return await StoreCategoryRepository.find().populate('stores')
  }

  /**
   * @param name 카테고리 명
   * @returns 카테고리 데이터
   */
  public get = async (name: string): Promise<StoreCategoryDto | null> => {
    return await StoreCategoryRepository.findOne({ name }).populate('stores')
  }
}
