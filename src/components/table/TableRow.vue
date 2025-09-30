<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useUsersStore } from '@/stores/usersStore'
import { useValidation } from '@/composables/useValidation'
import { InputText, Select, Password, Button, type SelectChangeEvent } from 'primevue'
import { keysOfUser, UserType, type IUser } from '@/interfaces/IUser'
import type IValidation from '@/interfaces/IValidation'

const usersStore = useUsersStore()

const props = defineProps<{ user: IUser }>()

const currentUser = reactive<IUser>({
  id: props.user.id,
  mark: props.user.mark,
  typeUser: props.user.typeUser,
  login: props.user.login,
  password: props.user.password,
})

const { validateField, isFormValid, userErrors } = useValidation(currentUser)

const isUserSaved = ref<boolean>(false)

const selectOptions = [UserType.LOCAL_TYPE, UserType.LDAP_TYPE]

const isTypeLocal = computed(() => {
  return currentUser.typeUser === UserType.LOCAL_TYPE
})

const tempMarks = ref<string>(
  currentUser.mark ? currentUser.mark.map((mark) => mark.text).join(';') : '',
)

watch(tempMarks, (newVal) => {
  currentUser.mark = newVal.split(';').map((mark) => ({ text: mark }))
})

const handleInputBlur = (event: Event): void => {
  const target = event.target as HTMLInputElement
  validateField(target.name as keyof IValidation)

  if (isFormValid()) {
    usersStore.updateUser(currentUser)
    isUserSaved.value = true
  }
}

const handleSelectChange = (event: SelectChangeEvent): void => {
  currentUser.password = event.value === UserType.LDAP_TYPE ? null : ''

  if (isFormValid()) {
    usersStore.updateUser(currentUser)
    isUserSaved.value = true
  }
}
</script>

<template>
  <tr class="user">
    <td class="user__save-icon">
      <i v-if="isUserSaved" class="pi pi-check-square"></i>
    </td>
    <td class="user__mark">
      <InputText
        :name="keysOfUser.USER_MARK"
        @blur="handleInputBlur"
        v-model="tempMarks"
        :invalid="userErrors.mark"
      />
    </td>
    <td class="user__type">
      <Select
        @change="handleSelectChange"
        v-model="currentUser.typeUser"
        :options="selectOptions"
      />
    </td>
    <td class="user__login" :colspan="isTypeLocal ? 1 : 2">
      <InputText
        :name="keysOfUser.USER_LOGIN"
        @blur="handleInputBlur"
        v-model="currentUser.login"
        :invalid="userErrors.login"
      />
    </td>
    <td class="user__password" v-if="isTypeLocal">
      <Password
        class="password"
        :name="keysOfUser.USER_PASSWORD"
        @blur="handleInputBlur"
        v-model="currentUser.password"
        :invalid="userErrors.password"
        :feedback="false"
        toggleMask
      />
    </td>
    <td class="user__delete-icon">
      <Button
        icon="pi pi-trash"
        severity="contrast"
        variant="text"
        aria-label="delete user"
        @click="usersStore.removeUser(currentUser.id)"
      />
    </td>
  </tr>
</template>

<style scoped>
.user__save-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 36px;

  color: #00000070;
}

.user__mark > *,
.user__login > *,
.user__type > *,
.user__password > * > *:not(:nth-child(2)) {
  width: 100%;
}
</style>
