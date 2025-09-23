<script setup lang="ts">
import Button from 'primevue/button'
import { useUser } from '@/composables/useUser'

const { addUser } = useUser()
</script>

<template>
  <div class="header">
    <div class="accaunts">
      <h1>Учетные записи</h1>
      <Button label="+" @click="addUser" />
    </div>

    <p class="hint">
      <i class="pi pi-question-circle"></i>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель
      <strong>;</strong>
    </p>
  </div>
</template>

<style scoped>
.header {
  padding-top: 30px;
  padding-inline: 100px;
}
.accaunts {
  display: flex;
  gap: 30px;
  align-items: center;

  min-width: 310px;

  padding-bottom: 30px;
}

.hint {
  width: max-content;

  padding: 6px;
  background-color: rgb(234, 237, 241);
  border-radius: 5px;

  font-size: 18px;
}
</style>
