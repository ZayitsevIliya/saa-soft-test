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
      return value.join().length > 10
    },

    login: (value: string): boolean => {
      return !value.trim() || value.length > 10
    },

    password: (value: string): boolean => {
      return !value.trim() || value.length > 10
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
    const value = user[field] as string & string[]
    const validator = validators[field]

    if (validator) {
      userErrors[field] = validator(value) ? true : false
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
