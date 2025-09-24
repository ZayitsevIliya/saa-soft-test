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
table {
  margin-inline: 100px;
}
thead td:not(:last-child) {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);

  padding: 15px;
  width: 250px;
}
</style>
