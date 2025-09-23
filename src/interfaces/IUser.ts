export enum UserType {
  LOCAL_TYPE = 'Локальная',
  LDPA_TYPE = 'LDPA',
}

export interface IUser {
  id: number
  mark: string[]
  typeUser: UserType
  login: string
  password: string | null
}
