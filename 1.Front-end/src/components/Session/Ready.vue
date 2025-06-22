<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const emit = defineEmits(['setPage'])
const sessionStore = useSessionStore()
</script>
<template>
  <h1>Aguardando a galera terminar...</h1>
  <h1 class="text-5xl">
    {{ `${sessionStore.readyUsers.length}/${sessionStore.usersJoined.length}` }}
  </h1>
</template>
<style scoped></style>
