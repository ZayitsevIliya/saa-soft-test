export enum UserType {
  LOCAL_TYPE = 'Локальная',
  LDAP_TYPE = 'LDAP',
}

type MarkType = Record<'text', string>

export interface IUser {
  id: string
  mark: MarkType[]
  typeUser: UserType
  login: string
  password: string | null
}
