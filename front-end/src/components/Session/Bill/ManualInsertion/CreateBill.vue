<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
const emit = defineEmits(['setPage'])
const sessionStore = useSessionStore()
</script>
<template>
  <div class="w-full flex flex-col gap-8 items-center justify-center">
    <div class="p-6 w-full bg-white rounded-xl">
      <h1>{{ sessionStore.getSessionId() }}</h1>
    </div>
  </div>
</template>
