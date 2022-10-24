import UserRepository from '../repository/UserRepository'
import UserDto from '../dto/UserDto'

/**
 * 사용자 조회 서비스
 */
export default class UserRetireveService {
  /**
   * @returns 사용자 데이터 리스트
   */
  public getList = async (): Promise<UserDto[]> => {
    return await UserRepository.find()
  }

  /**
   * @param userName 사용자 id
   * @returns 사용자 데이터
   */
  public get = async (userName: string): Promise<UserDto | null> => {
    return await UserRepository.findOne({ userName })
  }
}
