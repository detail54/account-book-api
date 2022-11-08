export default class UserTokenDto {
  public accessToken: string

  public refreshTokenKey: string

  constructor(accessToken: string, refreshTokenKey: string) {
    this.accessToken = accessToken
    this.refreshTokenKey = refreshTokenKey
  }
}
