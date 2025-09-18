<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { InputText } from 'primevue'
import { Select } from 'primevue'
import { Password } from 'primevue'
import { Button } from 'primevue'
import { computed, ref } from 'vue'

defineProps(['rowId'])

const mark = ref<string>('')

const selectOptions: string[] = ['Локальная', 'LDAP']
const userType = ref<string>(selectOptions[0])

const isTypeLocal = computed(() => {
  return userType.value === selectOptions[0]
})

const login = ref<string>('')
const isLoginValid = ref<boolean>(false)

const password = ref<string>('')
const isPasswordValid = ref<boolean>(false)

function validateLogin(): void {
  isLoginValid.value = login.value.trim() === ''
}

function validatePassword(): void {
  isPasswordValid.value = password.value.trim() === ''
}

const { remove } = useUser()
</script>

<template>
  <tr>
    <td>
      <InputText v-model="mark" type="text" />
    </td>
    <td>
      <Select style="width: 100%" v-model="userType" :options="selectOptions" />
    </td>
    <td :colspan="isTypeLocal ? 1 : 2">
      <InputText
        @blur="validateLogin"
        :invalid="isLoginValid"
        v-model="login"
        style="width: 100%"
        type="text"
      />
    </td>
    <td v-if="isTypeLocal">
      <Password
        @blur="validatePassword"
        :invalid="isPasswordValid"
        v-model="password"
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
        @click="remove(rowId)"
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
