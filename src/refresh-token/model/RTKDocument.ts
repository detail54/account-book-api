import { Document } from 'mongoose'
import UserDto from 'src/user/dto/UserDto'

export default class RTKDocument extends Document {
  public id: String

  public token: String

  public userId: String

  constructor(id: string, token: string, userId: string) {
    super()
    this.id = id
    this.token = token
    this.userId = userId
  }
}
