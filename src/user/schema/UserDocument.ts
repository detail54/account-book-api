import { Document } from 'mongoose'

/**
 * User mongoose document
 */
export default class UserDocument extends Document {
  public id: String

  public userName: String

  public password: String

  public incomes: []

  public accounts: []

  public regDt: Date

  public updateDt: Date

  /**
   * 생성자
   * @param id 사용자 식별 id
   * @param userName 아이디
   * @param password 비밀번호
   * @param incomes 수익 리스트
   * @param accounts 지출 리스트
   * @param regDt 가입일
   * @param updateDt 정보 수정일
   */
  constructor(id: string, userName: string, password: string, incomes: [], accounts: [], regDt: Date, updateDt: Date) {
    super()
    this.id = id
    this.userName = userName
    this.password = password
    this.incomes = incomes
    this.accounts = accounts
    this.regDt = regDt
    this.updateDt = updateDt
  }
}
