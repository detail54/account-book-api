import StoreDto from 'src/store/dto/StoreDto'

/**
 * 가맹점 분류할 카테고리 등록 dto
 */
export default class StoreCategoryRegistDto {
  public name: string

  public stores: StoreDto[]

  /**
   *
   * @param name 카테고리명
   */
  constructor(name: string, stores: StoreDto[]) {
    this.name = name
    this.stores = stores
  }
}
