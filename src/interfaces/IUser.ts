export enum UserType {
  LOCAL_TYPE = 'Локальная',
  LDAP_TYPE = 'LDAP',
}

export enum keysOfUser {
  USER_ID = 'id',
  USER_MARK = 'mark',
  USER_TYPE = 'typeUser',
  USER_LOGIN = 'login',
  USER_PASSWORD = 'password',
}

type MarkType = Record<'text', string>

export interface IUser {
  [keysOfUser.USER_ID]: string
  [keysOfUser.USER_MARK]: MarkType[]
  [keysOfUser.USER_TYPE]: UserType
  [keysOfUser.USER_LOGIN]: string
  [keysOfUser.USER_PASSWORD]: string | null
}
