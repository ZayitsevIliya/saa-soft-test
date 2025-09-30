<script setup lang="ts">
import TableRow from '@/components/table/TableRow.vue'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <table>
    <thead>
      <tr class="table__header">
        <th class="table-cell__save-icon"></th>
        <th class="table-cell__mark">Метки</th>
        <th class="table-cell__type">Тип записи</th>
        <th class="table-cell__login">Логин</th>
        <th class="table-cell__password">Пароль</th>
        <th class="table-cell__delete-icon"></th>
      </tr>
    </thead>
    <tbody>
      <TableRow class="table__row" v-for="user in usersStore.users" :key="user.id" :user="user" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-left: min(5%, 100px);
}

.table__header {
  position: sticky;

  height: 45px;
  top: 240px;

  z-index: 10;
}

.table-cell__mark,
.table-cell__type,
.table-cell__login,
.table-cell__password {
  width: 250px;

  border-radius: 4px;

  background-color: rgb(234, 237, 241);

  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
}

.table-cell__type {
  min-width: 138px;
}

.table-cell__save-icon,
.table-cell__delete-icon {
  width: 25px;
  min-width: 25px;
  background-color: #fff;
}
</style>
