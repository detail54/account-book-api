import RTKDto from '../dto/RTKDto'
import RTKRepository from '../repository/RTKRepository'

export default class RTKRetireveService {
  public get = async (_id: string): Promise<RTKDto | null> => {
    return await RTKRepository.findById(_id)
  }
}
