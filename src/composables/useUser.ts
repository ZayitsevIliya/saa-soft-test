import { useUsersStore } from '@/stores/usersStore'
import { type IUser } from '@/interfaces/IUser'

export function useUser() {
  const usersStore = useUsersStore()

  const addUser = (): void => usersStore.addNewUser()

  const removeUser = function (id: number): void {
    usersStore.removeUser(id)
  }

  const saveUser = function (userToSave: IUser): void {
    const currentUser = usersStore.users.filter((user: IUser) => user.id === userToSave.id)[0]

    currentUser.id = userToSave.id
    currentUser.mark = userToSave.mark
    currentUser.typeUser = userToSave.typeUser
    currentUser.login = userToSave.login
    currentUser.password = userToSave.password

    usersStore.saveUsers()
  }

  return {
    addUser,
    removeUser,
    saveUser,
  }
}
