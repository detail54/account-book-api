import ExpenditureDto from 'src/expenditure/dto/ExpenditureDto'
import StoreDto from 'src/store/dto/StoreDto'

/**
 * 가맹점 분류할 카테고리 Dto
 */
export default class StoreCategoryDto {
  public _id: string

  public name: string

  public stores: StoreDto[]

  public expenditures: ExpenditureDto[]

  /**
   *
   * @param id 카테고리 id
   * @param name 카테고리명
   * @param stores 카테고리에 등록된 가맹점 리스트
   * @param accounts 카테고리의 지출내역 리스트
   */
  constructor(id: string, name: string, stores: StoreDto[], expenditures: ExpenditureDto[]) {
    this._id = id
    this.name = name
    this.stores = stores
    this.expenditures = expenditures
  }
}
