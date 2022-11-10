import JWToken from '../../core/utils/JWToken'
import UserDto from '../../user/dto/UserDto'
import RTKDocument from '../model/RTKDocument'
import RTKRepository from '../repository/RTKRepository'

export default class RTKChangeService {
  public register = async (user: UserDto): Promise<RTKDocument> => {
    const retireveToken = await RTKRepository.findOne({ user })
    const token = await new JWToken().createRefreshToken()

    if (retireveToken) {
      await RTKRepository.deleteOne({ _id: retireveToken._id })
    }

    return await RTKRepository.create({ token, user })
  }
}