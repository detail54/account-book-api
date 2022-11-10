import UserDto from '../../user/dto/UserDto'

export default class RTKDto {
  public _id: string

  public token: string

  public userId: string

  constructor(id: string, token: string, userId: string) {
    this._id = id
    this.token = token
    this.userId = userId
  }
}
