<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import type IUser from '@/interfaces/IUser'
import type IValidation from '@/interfaces/IValidation'
import { InputText, type SelectChangeEvent } from 'primevue'
import { Select } from 'primevue'
import { Password } from 'primevue'
import { Button } from 'primevue'
import { ref, computed, reactive, watch } from 'vue'

const props = defineProps(['user'])

const errors = reactive<IValidation>({})

const user = reactive<IUser>({
  id: props.user.id,
  mark: props.user.mark,
  typeUser: props.user.typeUser,
  login: props.user.login,
  password: props.user.password,
})

const validators = {
  mark: (value: string[]): boolean => {
    return value.join().length > 50
  },

  typeUser: (value: string): boolean => {
    return !value
  },

  login: (value: string): boolean => {
    return !value.trim() || value.length > 100
  },

  password: (value: string): boolean => {
    return !value.trim() || value.length > 100
  },
}

const validateField = (field: keyof IValidation): void => {
  const value = user[field] as string & string[]
  const validator = validators[field]

  if (validator) {
    const hasError = validator(value)
    if (hasError) {
      errors[field] = true
    } else {
      delete errors[field]
    }
  }
}

const isFormValid = (): boolean => {
  return (
    Object.keys(errors).length === 0 &&
    user.login.trim() !== '' &&
    (user.password !== '' || user.password === null)
  )
}

const selectOptions: string[] = ['Локальная', 'LDAP']

const isTypeLocal = computed(() => {
  return user.typeUser === selectOptions[0]
})

const marks = ref<string>(user.mark ? user.mark.join(';') : '')

watch(marks, (newVal) => {
  user.mark = newVal.split(';')
})

const handleSelectChange = (event: SelectChangeEvent): void => {
  user.password = event.value === selectOptions[1] ? null : ''

  if (isFormValid()) {
    saveUser(user)
  }
}

const handleInputBlur = (event: Event): void => {
  const target = event.target as HTMLInputElement
  validateField(target.name as keyof IValidation)

  if (isFormValid()) {
    saveUser(user)
  }
}

watch(errors, (newVal) => {
  console.log(newVal)
})

const { removeUser, saveUser } = useUser()
</script>

<template>
  <tr>
    <td>
      <InputText
        @blur="handleInputBlur"
        :invalid="errors.mark"
        name="mark"
        v-model="marks"
        type="text"
      />
    </td>
    <td>
      <Select
        @change="handleSelectChange"
        name="userType"
        style="width: 100%"
        v-model="user.typeUser"
        :options="selectOptions"
      />
    </td>
    <td :colspan="isTypeLocal ? 1 : 2">
      <InputText
        @blur="handleInputBlur"
        :invalid="errors.login"
        name="login"
        v-model="user.login"
        style="width: 100%"
      />
    </td>
    <td v-if="isTypeLocal">
      <Password
        @blur="handleInputBlur"
        :invalid="errors.password"
        name="password"
        v-model="user.password"
        style="width: 98%"
        :feedback="false"
        toggleMask
      />
    </td>
    <td>
      <Button
        icon="pi pi-trash"
        severity="contrast"
        variant="text"
        aria-label="Cancel"
        @click="removeUser(user.id)"
      />
    </td>
  </tr>
</template>

<style scoped>
td:not(:last-child) {
  padding-inline: 5px;
  align-items: center;
}
</style>
