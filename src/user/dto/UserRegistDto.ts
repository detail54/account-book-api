/**
 * 사용자 등록 dto
 */
export default class UserRegistDto {
  public userName: string

  public password: string

  /**
   *
   * @param userName 사용자 아이디
   * @param password 사용자 비밀번호
   */
  constructor(userName: string, password: string) {
    this.userName = userName
    this.password = password
  }
}
