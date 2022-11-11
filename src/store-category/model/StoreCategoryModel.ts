import mongoose, { Schema } from 'mongoose'
import StoreCategoryDocument from './StoreCategoryDocument'

/**
 * Store Category schema
 */
class StoreCategorySchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      name: { type: String, required: true, unique: true },
    })
  }
}

/**
 * Store Category model
 */
export default mongoose.model<StoreCategoryDocument>('StoreCategory', new StoreCategorySchema())
