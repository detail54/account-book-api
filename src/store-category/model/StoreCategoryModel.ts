import mongoose, { Schema } from 'mongoose'
import StoreCategoryDocument from './StoreCategoryDocument'

/**
 * Store Category schema
 */
class StoreCategorySchema extends Schema<StoreCategoryDocument> {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      name: { type: String, required: true, unique: true },
      stores: [{ type: mongoose.Types.ObjectId, ref: 'Store' }],
      accounts: [{ type: mongoose.Types.ObjectId, ref: 'Account' }],
    })
  }
}

/**
 * Store Category model
 */
export default mongoose.model('StoreCategory', new StoreCategorySchema())
