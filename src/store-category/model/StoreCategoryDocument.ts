import { Document } from 'mongoose'
import ExpenditureDto from 'src/expenditure/dto/ExpenditureDto'
import StoreDto from 'src/store/dto/StoreDto'

/**
 * Store Category schema document
 */
export default class StoreCategoryDocument extends Document {
  public id: String

  public name: String

  constructor(id: string, name: string) {
    super()
    this.id = id
    this.name = name
  }
}
