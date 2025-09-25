<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { ref, computed, reactive, watch } from 'vue'
import { useValidation } from '@/composables/useValidation'
import { InputText, Select, Password, Button } from 'primevue'
import { UserType, type IUser } from '@/interfaces/IUser'

const props = defineProps<{ user: IUser }>()

const currentUser = reactive<IUser>({
  id: props.user.id,
  mark: props.user.mark,
  typeUser: props.user.typeUser,
  login: props.user.login,
  password: props.user.password,
})

const { removeUser } = useUser()
const { handleInputBlur, handleSelectChange, userErrors, isUserSaved } = useValidation(currentUser)

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
</script>

<template>
  <tr class="user">
    <td class="user__save-icon">
      <i v-if="isUserSaved" class="pi pi-check-square"></i>
    </td>
    <td class="user__mark">
      <InputText
        name="mark"
        @blur="handleInputBlur($event, currentUser)"
        v-model="tempMarks"
        :invalid="userErrors.mark"
        style="width: 100%"
      />
    </td>
    <td class="user__type">
      <Select
        @change="handleSelectChange"
        v-model="currentUser.typeUser"
        :options="selectOptions"
        style="width: 100%"
      />
    </td>
    <td class="user__login" :colspan="isTypeLocal ? 1 : 2">
      <InputText
        name="login"
        @blur="handleInputBlur($event, currentUser)"
        v-model="currentUser.login"
        :invalid="userErrors.login"
        style="width: 100%"
      />
    </td>
    <td class="user__password" v-if="isTypeLocal">
      <Password
        class="password"
        name="password"
        @blur="handleInputBlur($event, currentUser)"
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
        @click="removeUser(currentUser.id)"
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

.user__password > * > *:not(:nth-child(2)) {
  width: 100%;
}
</style>
