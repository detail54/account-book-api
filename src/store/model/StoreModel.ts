import mongoose, { Schema } from 'mongoose'
import StoreDocument from './StoreDocument'

class StoreSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      category: { type: mongoose.Types.ObjectId, ref: 'StoreCategory' },
      name: { type: String, required: true, unique: true },
    })
  }
}

export default mongoose.model<StoreDocument>('Store', new StoreSchema())
