import RTKDto from '../dto/RTKDto'
import RTKRepository from '../repository/RTKRepository'

export default class RTKRetireveService {
  public get = async (token: string): Promise<RTKDto | null> => {
    return await RTKRepository.findOne({ token })
  }
}
