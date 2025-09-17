<script setup lang="ts">
import TableRow from '@/components/table/TableRow.vue'
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
      <TableRow />
    </tbody>
  </table>
</template>

<style scoped>
thead td {
  padding-left: 15px;
}
</style>
