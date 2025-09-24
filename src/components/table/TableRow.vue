<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useUser } from '@/composables/useUser'
import { useValidation } from '@/composables/useValidation'
import { InputText, Select, Password, Button, type SelectChangeEvent } from 'primevue'
import { UserType, type IUser } from '@/interfaces/IUser'

const props = defineProps(['user'])

const currentUser = reactive<IUser>({
  id: props.user.id,
  mark: props.user.mark,
  typeUser: props.user.typeUser,
  login: props.user.login,
  password: props.user.password,
})

const inputStyles = {
  localStyle: 'width: 248px',
  LPDAStyle: 'width: 500px',
}

const selectOptions = [UserType.LOCAL_TYPE, UserType.LDPA_TYPE]

const isTypeLocal = computed(() => {
  return currentUser.typeUser === UserType.LOCAL_TYPE
})

const tempMarks = ref<string>(currentUser.mark ? currentUser.mark.join(';') : '')

watch(tempMarks, (newVal) => {
  currentUser.mark = newVal.split(';')
})

const handleSelectChange = (event: SelectChangeEvent): void => {
  currentUser.password = event.value === UserType.LDPA_TYPE ? null : ''

  if (isFormValid()) {
    saveUser(currentUser)
  }
}

const { saveUser, removeUser } = useUser()
const { handleInputBlur, isFormValid, userErrors } = useValidation(currentUser)
</script>

<template>
  <tr>
    <td>
      <InputText
        name="mark"
        @blur="handleInputBlur($event, currentUser)"
        v-model="tempMarks"
        :invalid="userErrors.mark"
        style="width: 248px"
      />
    </td>
    <td>
      <Select
        @change="handleSelectChange"
        v-model="currentUser.typeUser"
        :options="selectOptions"
        style="width: 248px"
      />
    </td>
    <td :colspan="isTypeLocal ? 1 : 2">
      <InputText
        name="login"
        @blur="handleInputBlur($event, currentUser)"
        v-model="currentUser.login"
        :invalid="userErrors.login"
        :style="isTypeLocal ? inputStyles.localStyle : inputStyles.LPDAStyle"
      />
    </td>
    <td v-if="isTypeLocal">
      <Password
        name="password"
        @blur="handleInputBlur($event, currentUser)"
        v-model="currentUser.password"
        :invalid="userErrors.password"
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
        @click="removeUser(currentUser.id)"
      />
    </td>
  </tr>
</template>
