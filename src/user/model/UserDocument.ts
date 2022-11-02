import { Document } from 'mongoose'

/**
 * User schema document
 */
export default class UserDocument extends Document {
  public id: String

  public userName: String

  public password: String

  public salt: String

  public keyCount: String

  public incomes: []

  public expenditures: []

  public regDt: Date

  public updateDt: Date

  constructor(
    id: string,
    userName: string,
    password: string,
    salt: string,
    keyCount: string,
    incomes: [],
    expenditures: [],
    regDt: Date,
    updateDt: Date,
  ) {
    super()
    this.id = id
    this.userName = userName
    this.password = password
    this.salt = salt
    this.keyCount = keyCount
    this.incomes = incomes
    this.expenditures = expenditures
    this.regDt = regDt
    this.updateDt = updateDt
  }
}
