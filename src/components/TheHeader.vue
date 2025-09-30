<script setup lang="ts">
import Button from 'primevue/button'
import { useUsersStore } from '@/stores/usersStore'

const usersStore = useUsersStore()
</script>

<template>
  <div class="header">
    <div class="header__add-user">
      <h1 class="header__title">Учетные записи</h1>
      <Button
        class="header__button"
        aria-label="add user"
        label="+"
        @click="usersStore.addNewUser"
      />
    </div>

    <p class="header__hint">
      <i class="pi pi-question-circle"></i>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель
      <strong>;</strong>
    </p>
  </div>
</template>

<style scoped>
.header {
  background-color: #fff;
  height: 240px;

  padding-top: 30px;
  padding-inline: min(15%, 130px);

  position: sticky;
  z-index: 10;
  top: 0;
}
.header__add-user {
  display: flex;
  gap: 30px;
  align-items: center;

  min-width: 310px;

  padding-bottom: 30px;
}

.header__hint {
  max-width: max-content;
  min-width: 220px;

  margin: 0;
  padding: 6px;
  background-color: rgb(234, 237, 241);
  border-radius: 5px;

  font-size: 18px;
}
</style>
