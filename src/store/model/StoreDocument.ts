import { Document } from 'mongoose'
import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'

export default class StoreDocument extends Document {
  public id: String

  public category: StoreCategoryDto

  public name: String

  public accounts: []

  constructor(id: string, category: StoreCategoryDto, name: string, accounts: []) {
    super()
    this.id = id
    this.category = category
    this.name = name
    this.accounts = accounts
  }
}
