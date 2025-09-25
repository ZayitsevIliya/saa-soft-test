<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from './stores/usersStore'
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/table/TheTable.vue'

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
