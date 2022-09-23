import mongoose, { Schema } from 'mongoose'

class StoreCategorySchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      name: { type: String, required: true, unique: true },
      stores: [{ type: mongoose.Types.ObjectId, ref: 'Store' }],
      accounts: [{ type: mongoose.Types.ObjectId, ref: 'Account' }],
    })
  }
}

export default mongoose.model('StoreCategory', new StoreCategorySchema())
