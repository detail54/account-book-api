import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose'
import ExpenditureRepository from 'src/expenditure/repository/ExpenditureRepository'
import IncomeRepository from 'src/income/repository/IncomeRepository'
import UserDocument from './UserDocument'

/**
 * User mongoose schema
 */
class UserSchema extends Schema {
  constructor() {
    super({
      id: mongoose.Types.ObjectId,
      userName: { type: String, required: true, unique: true },
      password: { type: String, required: true, trim: true },
      salt: { type: String, required: true, trim: true },
      keyCount: { type: String, required: true, trim: true },
      regDt: { type: Date, default: Date.now },
      updateDt: { type: Date, default: Date.now },
    })

    this.pre('deleteOne', async function (next: CallbackWithoutResultAndOptionalError) {
      const user = await this.model.findOne(this.getFilter())

      IncomeRepository.deleteMany({ user })
      ExpenditureRepository.deleteMany({ user })

      next()
    })
  }
}

/**
 * User mongoose model
 */
export default mongoose.model<UserDocument>('User', new UserSchema())
