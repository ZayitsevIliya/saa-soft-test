import { useUsersStore } from '@/stores/usersStore'

export function useUser() {
  const userStore = useUsersStore()

  const add = () => userStore.addUser()
  const remove = function (id: number) {
    userStore.removeUser(id)
  }

  return {
    add,
    remove,
  }
}
