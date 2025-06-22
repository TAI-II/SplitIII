<script setup lang="ts">
const emit = defineEmits(['setPage'])
</script>
<template>
  <div class="w-full flex flex-col h-screen gap-8 items-center justify-center">
    <h3>Como deseja digitalizar sua comanda?</h3>
    <button
      @click="emit('setPage', 'takePhoto')"
      class="w-full h-28 flex flex-col items-center px-2 justify-center bg-secondary hover:bg-primary button-style"
    >
      <h1>Foto da Nota Fiscal</h1>
      <p class="text-center">
        Tire uma foto da nota fiscal e nossa inteligência aritificial extrairá
        os dados automáticamente
      </p>
    </button>
    <button
      @click="emit('setPage', 'createBillManualInsertion')"
      class="w-full h-28 flex flex-col items-center px-2 justify-center bg-secondary hover:bg-primary button-style"
    >
      <h1>Digitar os produtos</h1>
      <p class="text-center">
        Informe os produtos consumidos e gastos adicionais
      </p>
    </button>
  </div>
</template>
