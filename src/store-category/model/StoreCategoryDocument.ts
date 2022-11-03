import { Document } from 'mongoose'
import ExpenditureDto from 'src/expenditure/dto/ExpenditureDto'
import StoreDto from 'src/store/dto/StoreDto'

/**
 * Store Category schema document
 */
export default class StoreCategoryDocument extends Document {
  public id: String

  public name: String

  public stores: StoreDto[]

  public expenditures: ExpenditureDto[]

  constructor(id: string, name: string, stores: [], expenditures: []) {
    super()
    this.id = id
    this.name = name
    this.stores = stores
    this.expenditures = expenditures
  }
}
