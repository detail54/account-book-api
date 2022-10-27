import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'
import StoreDto from 'src/store/dto/StoreDto'
import UserDto from 'src/user/dto/UserDto'

export default class ExpenditureRegistDto {
  public user: UserDto

  public paymentDt: Date

  public category: StoreCategoryDto

  public store: StoreDto

  public amount: Number

  public memo?: string

  constructor(
    user: UserDto,
    paymentDt: Date,
    category: StoreCategoryDto,
    store: StoreDto,
    amount: number,
    memo?: string,
  ) {
    this.user = user
    this.paymentDt = paymentDt
    this.category = category
    this.store = store
    this.amount = amount
    this.memo = memo
  }
}
