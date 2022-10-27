import { Document } from 'mongoose'
import StoreCategoryDto from 'src/store-category/dto/StoreCategoryDto'
import StoreDto from 'src/store/dto/StoreDto'
import UserDto from 'src/user/dto/UserDto'

export default class ExpenditureDocument extends Document {
  public id: String

  public user: UserDto

  public regDt: Date

  public updateDt: Date

  public paymentDt: Date

  public category: StoreCategoryDto

  public store: StoreDto

  public amount: Number

  public memo: String

  constructor(
    id: string,
    user: UserDto,
    regDt: Date,
    updateDt: Date,
    paymentDt: Date,
    category: StoreCategoryDto,
    store: StoreDto,
    amount: number,
    memo: string,
  ) {
    super()
    this.id = id
    this.user = user
    this.regDt = regDt
    this.updateDt = updateDt
    this.paymentDt = paymentDt
    this.category = category
    this.store = store
    this.amount = amount
    this.memo = memo
  }
}
