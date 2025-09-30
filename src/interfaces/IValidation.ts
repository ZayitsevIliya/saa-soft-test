import { keysOfUser } from './IUser'

export default interface ValidationErrors {
  [keysOfUser.USER_MARK]: boolean
  [keysOfUser.USER_LOGIN]: boolean
  [keysOfUser.USER_PASSWORD]: boolean
}
