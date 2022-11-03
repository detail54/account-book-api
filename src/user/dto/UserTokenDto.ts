export default class UserTokenDto {
  public _id: string

  public userName: string

  public regDt: Date

  constructor(id: string, userName: string, regDt: Date) {
    this._id = id
    this.userName = userName
    this.regDt = regDt
  }
}
