<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSessionStore } from '@/stores/session'
const emit = defineEmits(['setPage'])
const userStore = useUserStore()
const sessionStore = useSessionStore()

const sessionCode = ref<string>('')
const name = ref<string>('')

const errorMsg = ref<string>('')
const enterSession = () => {
  if (sessionCode.value.length < 10)
    return (errorMsg.value = 'Digite o código de 4 dígitos da sessão!')
  if (name.value.length < 3) return (errorMsg.value = 'Digite o seu nome!')
  errorMsg.value = ''
  userStore.createUser(name.value)
  sessionStore.fetchSession(sessionCode.value)
  // userStore.joinSession(userStore.user.id, sessionCode.value)
}
</script>
<template>
  <div class="w-full flex h-screen flex-col gap-8 items-end justify-center">
    <div
      class="w-full flex flex-col gap-4 items-start justify-center bg-white px-6 py-8 rounded-2xl"
    >
      <h1>Entrar em uma sessão</h1>
      <p>Para entrar em uma sessão insira os dados nos campos indicados:</p>

      <div class="flex flex-col w-full gap-3 mt-2">
        <div class="relative w-full">
          <i
            class="mdi mdi-lock-outline absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-2xl"
          ></i>
          <input
            v-model="sessionCode"
            maxlength="10"
            placeholder="Código da sessão"
            class="pl-14 py-3 border w-full border-black rounded-2xl focus:outline-none"
          />
        </div>
        <div class="relative w-full">
          <i
            class="mdi mdi-account-outline absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-2xl"
          ></i>
          <input
            v-model="name"
            placeholder="Seu nome"
            class="pl-14 py-3 border w-full border-black rounded-2xl focus:outline-none"
          />
        </div>
      </div>
      <span class="text-xs text-red-600">{{ errorMsg }}</span>
      <button
        @click="enterSession()"
        class="w-full button-style h-14 bg-secondary hover:bg-primary"
      >
        <h1>Entrar</h1>
      </button>
    </div>
    <button
      @click="emit('setPage', 'select', true)"
      class="w-12 h-12 border-[3px] flex items-center hover:bg-primary justify-center bg-white border-black rounded-full shrink-0"
    >
      <i class="mdi mdi-keyboard-return text-2xl"></i>
    </button>
  </div>
</template>
