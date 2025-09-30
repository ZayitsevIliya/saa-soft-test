import { computed, reactive } from 'vue'
import type IValidation from '@/interfaces/IValidation'
import { type IUser, keysOfUser } from '@/interfaces/IUser'

export function useValidation(user: IUser) {
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

  const validateField = (field: keyof IValidation): void => {
    switch (field) {
      case keysOfUser.USER_MARK:
        userErrors.mark = validators.mark(user.mark.map((mark) => mark.text))
        break
      case keysOfUser.USER_LOGIN:
        userErrors.login = validators.login(user.login)
        break
      case keysOfUser.USER_PASSWORD:
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
    userErrors,
  }
}
