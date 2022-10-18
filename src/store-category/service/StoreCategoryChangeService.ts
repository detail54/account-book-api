import StoreCategoryRepository from '../repository/StoreCategoryRepository'

export default class StoreCategoryChangeService {
  public register = async (name: string) => {
    await StoreCategoryRepository.create({
      name,
      stores: [],
      accounts: [],
    })
  }
}
