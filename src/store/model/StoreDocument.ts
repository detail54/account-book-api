import { Document } from 'mongoose'
import ExpenditureDto from 'src/expenditure/dto/ExpenditureDto'
import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'

export default class StoreDocument extends Document {
  public id: String

  public category: StoreCategoryDto

  public name: String

  public expenditures: ExpenditureDto[]

  constructor(id: string, category: StoreCategoryDto, name: string, expenditures: []) {
    super()
    this.id = id
    this.category = category
    this.name = name
    this.expenditures = expenditures
  }
}
