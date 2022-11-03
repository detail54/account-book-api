import { Document } from 'mongoose'
import ExpenditureDto from 'src/expenditure/dto/ExpenditureDto'
import IncomeDto from 'src/income/dto/IncomeDto'

/**
 * User schema document
 */
export default class UserDocument extends Document {
  public _id: String

  public userName: String

  public password: String

  public salt: String

  public keyCount: String

  public incomes: IncomeDto[]

  public expenditures: ExpenditureDto[]

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
    this._id = id
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
