import mongoose, { Schema } from 'mongoose'
import RTKDocument from './RTKDocument'

class RTKSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      token: { type: String },
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
    })
  }
}

export default mongoose.model<RTKDocument>('RTK', new RTKSchema())
