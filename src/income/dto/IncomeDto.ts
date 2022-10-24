import UserDto from '../../user/dto/UserDto'

export default class IncomeDto {
  public id: string

  public user: UserDto

  public regDt: Date

  public updateDt: Date

  public incomeDt: Date

  public amount: number

  public memo: string

  constructor(id: string, user: UserDto, regDt: Date, updateDt: Date, incomeDt: Date, amount: number, memo: string) {
    this.id = id
    this.user = user
    this.regDt = regDt
    this.updateDt = updateDt
    this.incomeDt = incomeDt
    this.amount = amount
    this.memo = memo
  }
}
