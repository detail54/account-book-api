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
    return await StoreCategoryRepository.find()
  }

  /**
   * @param _id 카테고리 식별 id
   * @returns 카테고리 데이터
   */
  public get = async (_id: string): Promise<StoreCategoryDto | null> => {
    return await StoreCategoryRepository.findOne({ _id })
  }
}
