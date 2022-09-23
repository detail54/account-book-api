import UserRepository from '../repository/UserRepository'
import UserDocument from '../schema/UserDocument'

/**
 * 사용자 조회 서비스
 */
export default class UserRetireveService {
  /**
   * @returns 사용자 데이터 리스트
   */
  public getList = async (): Promise<UserDocument[]> => {
    return await UserRepository.find()
  }

  /**
   * @param userName 사용자 이름
   * @returns 사용자 데이터
   */
  public get = async (userName: string): Promise<UserDocument | null> => {
    return await UserRepository.findOne({ userName })
  }
}
