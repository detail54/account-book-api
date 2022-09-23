import mongoose, { Schema } from 'mongoose'

class IncomeSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      regDt: { type: Date, default: Date.now },
      updateDt: { type: Date, default: Date.now },
      incomeDt: { type: Date, required: true },
      amount: { type: Number, required: true },
      memo: { type: String },
    })
  }
}

export default mongoose.model('Income', new IncomeSchema())
