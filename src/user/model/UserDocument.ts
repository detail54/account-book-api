import { Document } from 'mongoose'

/**
 * User schema document
 */
export default class UserDocument extends Document {
  public id: String

  public userName: String

  public password: String

  public incomes: []

  public accounts: []

  public regDt: Date

  public updateDt: Date

  constructor(id: string, userName: string, password: string, incomes: [], accounts: [], regDt: Date, updateDt: Date) {
    super()
    this.id = id as String
    this.userName = userName as String
    this.password = password as String
    this.incomes = incomes
    this.accounts = accounts
    this.regDt = regDt
    this.updateDt = updateDt
  }
}
