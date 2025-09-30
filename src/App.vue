<script setup lang="ts">
import { onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheTable from '@/components/table/TheTable.vue'
import { useStorage } from './composables/useStorage'

const { loadUsers } = useStorage()

onMounted((): void => {
  loadUsers()
})
</script>

<template>
  <div class="main-container">
    <TheHeader />
    <TheTable />
  </div>
</template>
