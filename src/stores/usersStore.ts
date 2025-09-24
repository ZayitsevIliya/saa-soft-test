import { defineStore } from 'pinia'
import { UserType, type IUser } from '@/interfaces/IUser'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as IUser[],
  }),
  getters: {
    validUsersList(): IUser[] {
      return this.users.filter(
        (user) => user.login.trim() !== '' && (user.password !== '' || user.password === null),
      )
    },
  },
  actions: {
    addNewUser(): void {
      this.users.push({
        id: crypto.randomUUID(),
        mark: [],
        typeUser: UserType.LOCAL_TYPE,
        login: '',
        password: '',
      })
    },

    removeUser(id: string): void {
      this.users = this.users.filter((user) => user.id !== id)
      this.saveUsers()
    },

    saveUsers(): void {
      localStorage.setItem('users', JSON.stringify(this.validUsersList))
    },

    loadUsers(): void {
      const uploadUsers = localStorage.getItem('users')
      this.users = uploadUsers ? JSON.parse(uploadUsers) : []
    },
  },
})
