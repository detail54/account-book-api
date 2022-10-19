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
    this.id = id
    this.name = name
    this.stores = stores
    this.accounts = accounts
  }
}
