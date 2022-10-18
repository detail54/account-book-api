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
   * @param _id 사용자 식별 id
   * @returns 사용자 데이터
   */
  public get = async (_id: string): Promise<UserDto | null> => {
    return await UserRepository.findOne({ _id })
  }
}
