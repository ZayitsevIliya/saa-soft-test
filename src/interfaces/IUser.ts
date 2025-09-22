export default interface IUser {
  id: number
  mark: string[]
  typeUser: 'Локальная' | 'LDPA'
  login: string
  password: string | null
}
