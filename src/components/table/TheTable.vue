<script setup lang="ts">
import TableRow from '@/components/table/TableRow.vue'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <table>
    <thead>
      <tr>
        <td>Метки</td>
        <td>Тип записи</td>
        <td>Логин</td>
        <td>Пароль</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="user in usersStore.$state.users" :key="user.id" :user="user" />
    </tbody>
  </table>
</template>

<style scoped>
thead td {
  padding-left: 15px;
  min-width: 230px;
}
</style>
