<script setup lang="ts">
import TableRow from '@/components/table/TableRow.vue'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="user in usersStore.users" :key="user.id" :user="user" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-inline: 100px;
}
thead th:not(:last-child) {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);

  padding: 15px;
  min-width: 250px;
}
</style>
