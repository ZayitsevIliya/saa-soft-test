import { defineStore } from 'pinia'
import { ref } from 'vue'
import type IUser from '@/interfaces/IUser'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: ref<IUser[]>([]),
  }),
  actions: {
    addUser() {
      this.users.push({
        id: this.users.length,
        mark: '',
        typePassword: 'Локальная',
        login: '',
        password: '',
      })
    },
    removeUser(id: number) {
      this.users = this.users.filter((user) => user.id !== id)
    },
  },
})
