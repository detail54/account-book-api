/**
 * 유저 정보 Dto
 */
export default class UserDto {
  public id: string

  public userName: string

  public password: string

  public incomes: []

  public accounts: []

  public regDt: Date

  public updateDt: Date

  /**
   * -- 생성자 --
   * @param id 사용자 식별 id
   * @param userName 사용자 아이디
   * @param password 사용자 비밀번호
   * @param incomes 사용자 수익 리스트
   * @param accounts 사용자 지출 리스트
   * @param regDt 사용자 가입 날짜
   * @param updateDt 사용자 정보 수정 날짜
   */
  constructor(id: string, userName: string, password: string, incomes: [], accounts: [], regDt: Date, updateDt: Date) {
    this.id = id
    this.userName = userName
    this.password = password
    this.incomes = incomes
    this.accounts = accounts
    this.regDt = regDt
    this.updateDt = updateDt
  }
}
