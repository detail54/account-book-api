import mongoose, { Schema } from 'mongoose'
import RTKDocument from './RTKDocument'

class RTKSchema extends Schema<RTKDocument> {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      token: { type: String },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    })
  }
}

export default mongoose.model('RTK', new RTKSchema())
