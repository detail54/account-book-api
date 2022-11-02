import mongoose, { Schema } from 'mongoose'
import UserDocument from './UserDocument'

/**
 * User mongoose schema
 */
class UserSchema extends Schema<UserDocument> {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      userName: { type: String, required: true, unique: true },
      password: { type: String, required: true, trim: true },
      salt: { type: String, required: true, trim: true },
      keyCount: { type: String, required: true, trim: true },
      incomes: [{ type: Schema.Types.ObjectId, ref: 'incomes' }],
      expenditures: [{ type: Schema.Types.ObjectId, ref: 'Expenditures' }],
      regDt: { type: Date, default: Date.now },
      updateDt: { type: Date, default: Date.now },
    })
  }
}

/**
 * User mongoose model
 */
export default mongoose.model('User', new UserSchema())
