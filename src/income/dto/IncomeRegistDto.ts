import UserDto from 'src/user/dto/UserDto'

export default class IncomeRegistDto {
  public user: UserDto

  public incomeDt: Date

  public amount: number

  public memo?: string

  constructor(user: UserDto, incomeDt: Date, amount: number, memo?: string) {
    this.user = user
    this.incomeDt = incomeDt
    this.amount = amount
    this.memo = memo
  }
}
