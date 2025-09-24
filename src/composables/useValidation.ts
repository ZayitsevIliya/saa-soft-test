import type IValidation from '@/interfaces/IValidation'
import { type IUser } from '@/interfaces/IUser'
import { computed, reactive } from 'vue'
import { useUser } from './useUser'

export function useValidation(user: IUser) {
  const { saveUser } = useUser()

  const userErrors = reactive<IValidation>({
    mark: false,
    login: false,
    password: false,
  })

  const hasErrors = computed(() => {
    return Object.values(userErrors).some(Boolean)
  })

  const validators = {
    mark: (value: string[]): boolean => {
      return value.join().length > 50
    },

    login: (value: string): boolean => {
      return !value.trim() || value.length > 100
    },

    password: (value: string): boolean => {
      return !value.trim() || value.length > 100
    },
  }

  const handleInputBlur = (event: Event, user: IUser): void => {
    const target = event.target as HTMLInputElement
    validateField(target.name as keyof IValidation)

    if (isFormValid()) {
      saveUser(user)
    }
  }

  const validateField = (field: keyof IValidation): void => {
    switch (field) {
      case 'mark':
        userErrors.mark = validators.mark(user.mark.map((mark) => mark.text))
        break
      case 'login':
        userErrors.login = validators.login(user.login)
        break
      case 'password':
        userErrors.password = validators.password(user.password ?? '')
        break
    }
  }

  const isFormValid = (): boolean => {
    return (
      !hasErrors.value &&
      user.login.trim() !== '' &&
      (user.password !== '' || user.password === null)
    )
  }

  return {
    validateField,
    isFormValid,
    handleInputBlur,
    userErrors,
  }
}
