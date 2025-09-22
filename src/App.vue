<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/table/TheTable.vue'
import { onMounted } from 'vue'
import { useUsersStore } from './stores/usersStore'

const usersStore = useUsersStore()

onMounted((): void => {
  usersStore.loadUsers()
})
</script>

<template>
  <div class="main-container">
    <TheHeader />
    <TheTable />
  </div>
</template>

<style scoped></style>
