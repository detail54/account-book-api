import StoreDto from 'src/store/dto/StoreDto'

/**
 * 가맹점 분류할 카테고리 등록 dto
 */
export default class StoreCategoryRegistDto {
  public name: string

  /**
   *
   * @param name 카테고리명
   */
  constructor(name: string) {
    this.name = name
  }
}
