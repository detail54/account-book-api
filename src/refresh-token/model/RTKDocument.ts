import { Document } from 'mongoose'
import UserDto from 'src/user/dto/UserDto'

export default class RTKDocument extends Document {
  public id: String

  public token: String

  public user: UserDto

  constructor(id: string, token: string, user: UserDto) {
    super()
    this.id = id
    this.token = token
    this.user = user
  }
}
