import mongoose, { Schema } from 'mongoose'

class StoreSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      category: { type: mongoose.Types.ObjectId, ref: 'StoreCategory' },
      name: { type: String, required: true, unique: true },
      accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    })
  }
}

export default mongoose.model('Store', new StoreSchema())
