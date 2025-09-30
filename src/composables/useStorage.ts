import { useUsersStore } from '@/stores/usersStore'

export function useStorage() {
  const usersStore = useUsersStore()

  const STORAGE_KEY = 'users'

  const saveUsers = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersStore.validUsersList))
    } catch {
      console.log('Users not saved!')
      return
    }
  }

  const loadUsers = (): void => {
    try {
      const uploadUsers = localStorage.getItem(STORAGE_KEY)
      usersStore.users = uploadUsers ? JSON.parse(uploadUsers) : []
    } catch {
      console.log('Users not upload!')
      return
    }
  }

  return { saveUsers, loadUsers }
}
