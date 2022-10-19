import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'

/**
 * 가맹점 Dto
 */
export default class StoreDto {
  public _id: string

  public category: StoreCategoryDto

  public name: string

  public accounts: []

  /**
   *
   * @param id 가맹점 식별 id
   * @param category 가맹점 카테고리 정보
   * @param name 가맹점 명
   * @param accounts 가맹점 지출 내역 리스트
   */
  constructor(id: string, category: StoreCategoryDto, name: string, accounts: []) {
    this._id = id
    this.category = category
    this.name = name
    this.accounts = accounts
  }
}