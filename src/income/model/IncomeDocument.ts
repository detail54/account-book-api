import { Document } from 'mongoose'
import UserDto from 'src/user/dto/UserDto'

export default class IncomeDocument extends Document {
  public id: String

  public user: UserDto

  public regDt: Date

  public updateDt: Date

  public incomeDt: Date

  public amount: Number

  public memo: String

  constructor(id: string, user: UserDto, regDt: Date, updateDt: Date, incomeDt: Date, amount: number, memo: string) {
    super()
    this.id = id
    this.user = user
    this.regDt = regDt
    this.updateDt = updateDt
    this.incomeDt = incomeDt
    this.amount = amount
    this.memo = memo
  }
}
