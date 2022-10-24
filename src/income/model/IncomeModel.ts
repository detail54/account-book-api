import mongoose, { Schema } from 'mongoose'
import IncomeDocument from './IncomeDocument'

class IncomeSchema extends Schema<IncomeDocument> {
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
