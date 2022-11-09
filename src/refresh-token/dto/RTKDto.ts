import UserDto from '../../user/dto/UserDto'

export default class RTKDto {
  public _id: string

  public token: string

  public user: UserDto

  constructor(id: string, token: string, user: UserDto) {
    this._id = id
    this.token = token
    this.user = user
  }
}
