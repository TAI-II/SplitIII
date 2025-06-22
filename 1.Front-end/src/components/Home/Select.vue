<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNfsOcrStore } from '../../stores/nfsOcr'
import nfsImage from '../../assets/nfs.jpg'
import nfsImage2 from '../../assets/nfs2.jpeg'
import nfsImage3 from '../../assets/nfs3.jpeg'
import nfsImage4 from '../../assets/nfs4.jpeg'
import nfsImage5 from '../../assets/nfs5.jpeg'
const emit = defineEmits(['setPage'])
const nfsOcrStore = useNfsOcrStore()
</script>
<template>
  <div class="w-full h-screen flex flex-col gap-8 items-center justify-center">
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
