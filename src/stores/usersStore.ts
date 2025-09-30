import { defineStore } from 'pinia'
import { UserType, type IUser } from '@/interfaces/IUser'
import { useStorage } from '@/composables/useStorage'

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

    updateUser(patch: IUser): void {
      const userToPatch = this.users.find((user) => user.id === patch.id)

      if (!userToPatch) return

      Object.assign(userToPatch, { ...patch, id: patch.id })

      const { saveUsers } = useStorage()
      saveUsers()
    },

    removeUser(id: string): void {
      this.users = this.users.filter((user) => user.id !== id)

      const { saveUsers } = useStorage()
      saveUsers()
    },
  },
})
