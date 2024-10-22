<script setup lang="ts">
const emit = defineEmits(['setPage'])
</script>
<template>
  <div class="w-full flex flex-col gap-8 items-center justify-center">
    <h3>Selecione a opção desejada :</h3>
    <button
      @click="emit('setPage', 'createSession')"
      class="w-full h-28 flex flex-col items-center justify-center bg-secondary hover:bg-primary button-style"
    >
      <h1>Criar uma Sessão</h1>
      <p>Nova Divisão</p>
    </button>
    <button
      @click="emit('setPage', 'enterSession')"
      class="w-full h-28 flex flex-col items-center justify-center bg-secondary hover:bg-primary button-style"
    >
      <h1>Entrar em uma Sessão</h1>
      <p>Continuar Divisão</p>
    </button>
  </div>
</template>
