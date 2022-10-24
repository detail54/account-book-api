import { Document } from 'mongoose'

/**
 * Store Category schema document
 */
export default class StoreCategoryDocument extends Document {
  public id: String

  public name: String

  public stores: []

  public expenditures: []

  constructor(id: string, name: string, stores: [], expenditures: []) {
    super()
    this.id = id
    this.name = name
    this.stores = stores
    this.expenditures = expenditures
  }
}
