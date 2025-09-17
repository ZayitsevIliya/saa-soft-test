<script setup lang="ts">
import InputText from 'primevue/inputtext'
import CascadeSelect from 'primevue/cascadeselect'
import { Password } from 'primevue'
import Button from 'primevue/button'
</script>

<template>
  <tr>
    <td><InputText type="text" /></td>
    <td><CascadeSelect /></td>
    <td><InputText type="text" /></td>
    <td><Password :feedback="false" toggleMask /></td>
    <td>
      <Button icon="pi pi-trash" severity="contrast" variant="text" aria-label="Cancel"></Button>
    </td>
  </tr>
</template>
