import crypto from 'crypto'

export default class EncryptPW {
  private password: string
  private encryptPW: string

  constructor(password: string) {
    this.password = password
    this.encryptPW = ''
    this.base64crypto()
  }

  private base64crypto = async (): Promise<void> => {
    const randomBuf = crypto.randomBytes(64)
    const salt = randomBuf.toString('base64')
    this.encryptPW = crypto.pbkdf2Sync(this.password, salt, 10, 64, 'sha256').toString('base64')
  }

  public getEncryptPw = async (): Promise<string> => {
    return Promise.resolve(this.encryptPW)
  }
}
