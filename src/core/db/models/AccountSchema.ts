import mongoose, { Schema } from 'mongoose'

class AccountSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      user: { type: mongoose.Types.ObjectId, ref: 'User' },
      regDt: { type: Date, default: Date.now },
      updateDt: { type: Date, default: Date.now },
      paymentDt: { type: Date, required: true },
      category: { type: mongoose.Types.ObjectId, ref: 'StoreCategory' },
      store: { type: mongoose.Types.ObjectId, ref: 'Store' },
      amount: { type: Number, required: true },
      memo: { type: String },
    })
  }
}

export default mongoose.model('Account', new AccountSchema())
