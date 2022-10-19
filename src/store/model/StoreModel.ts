import mongoose, { Schema } from 'mongoose'
import StoreDocument from './StoreDocument'

class StoreSchema extends Schema<StoreDocument> {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      category: { type: mongoose.Types.ObjectId, ref: 'StoreCategory' },
      name: { type: String, required: true, unique: true },
      accounts: [{ type: mongoose.Types.ObjectId, ref: 'accounts' }],
    })
  }
}

export default mongoose.model('Store', new StoreSchema())
