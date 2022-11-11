import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose'
import ExpenditureDocument from './ExpenditureDocument'

class ExpenditureSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      regDt: { type: Date, default: Date.now },
      updateDt: { type: Date, default: Date.now },
      category: { type: Schema.Types.ObjectId, ref: 'StoreCategory' },
      store: { type: Schema.Types.ObjectId, ref: 'Store' },
      paymentDt: { type: Date, required: true },
      amount: { type: Number, required: true },
      memo: { type: String },
    })
  }
}

export default mongoose.model<ExpenditureDocument>('Expenditure', new ExpenditureSchema())
