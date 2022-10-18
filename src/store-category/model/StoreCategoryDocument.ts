import { Document } from 'mongoose'

/**
 * Store Category schema document
 */
export default class StoreCategoryDocument extends Document {
  public id: String

  public name: String

  public stores: []

  public accounts: []

  constructor(id: string, name: string, stores: [], accounts: []) {
    super()
    this.id = id as String
    this.name = name as String
    this.stores = stores
    this.accounts = accounts
  }
}
