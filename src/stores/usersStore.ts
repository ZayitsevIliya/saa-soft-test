import { defineStore } from 'pinia'
import { ref } from 'vue'
import type IUser from '@/interfaces/IUser'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: ref<IUser[]>([]),
  }),
  actions: {
    addNewUser(): void {
      this.users.push({
        id: this.users.length,
        mark: [],
        typeUser: 'Локальная',
        login: '',
        password: '',
      })
    },

    removeUser(id: number): void {
      this.users = this.users.filter((user) => user.id !== id)
      this.saveUsers()
    },

    saveUsers(): void {
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    loadUsers(): void {
      const uploadUsers = localStorage.getItem('users')
      this.users = uploadUsers ? JSON.parse(uploadUsers) : []
    },
  },
})
