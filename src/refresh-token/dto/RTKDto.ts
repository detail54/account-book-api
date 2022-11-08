export default class RTKDto {
  public _id: string

  public token: string

  constructor(id: string, token: string) {
    this._id = id
    this.token = token
  }
}
