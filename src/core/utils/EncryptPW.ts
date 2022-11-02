import crypto from 'crypto'

export default class EncryptPW {
  private encryptPW: string | undefined

  private password: string

  private keyCount: string

  private salt?: string

  constructor(password: string, keyCount: string, salt?: string) {
    this.password = password
    this.keyCount = keyCount
    this.salt = salt || ''
  }

  public base64crypto = async (): Promise<void> => {
    if (!this.salt) {
      this.salt = await this.getCreatedSalt()
    }

    const counts = this.keyCount.split('')
    const count1 = Number(counts[0])
    const count2 = Number(counts[1])

    const encryptedSalt = await this.getEncryptedSalt([count1, count2], this.salt)
    const roofCount = count1 * count2 + count1 + count2

    const onceEncryptedPW = crypto.pbkdf2Sync(this.password, encryptedSalt, count1, 64, 'sha256').toString('base64')
    this.encryptPW = crypto.pbkdf2Sync(onceEncryptedPW, encryptedSalt, roofCount, 64, 'sha256').toString('base64')
  }

  private getCreatedSalt = async (): Promise<string> => {
    return Promise.resolve(crypto.randomBytes(64).toString('base64'))
  }

  private getEncryptedSalt = async (counts: number[], salt: string): Promise<string> => {
    const [count1, count2] = counts
    const encryptedSalt = crypto.pbkdf2Sync(salt, `${count1}${count2}`, count1, 64, 'sha256').toString('base64')

    const slicedSalt1 = encryptedSalt.substring(0, 3)
    const slicedSalt2 = encryptedSalt.substring(3, count1)
    const slicedSalt3 = encryptedSalt.substring(count1, encryptedSalt.length)

    const nextEncryptSalt = slicedSalt1 + count1 + slicedSalt2 + count2 + slicedSalt3

    return Promise.resolve(nextEncryptSalt)
  }

  public getEncryptPw = async (): Promise<string | undefined> => {
    return Promise.resolve(this.encryptPW)
  }

  public getSalt = async (): Promise<string | undefined> => {
    return Promise.resolve(this.salt)
  }
}
