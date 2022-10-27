import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'

/**
 * 가맹점 등록 Dto
 */
export default class StoreRegistDto {
  public name: string

  public categoryName?: string

  public category: StoreCategoryDto

  /**
   *
   * @param category 가맹점 카테고리 명
   * @param name 가맹점 명
   */
  constructor(name: string, categoryName: string, category: StoreCategoryDto) {
    this.name = name
    this.categoryName = categoryName
    this.category = category
  }
}
