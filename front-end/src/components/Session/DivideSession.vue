<script setup lang="ts">
import { useBillStore } from '@/stores/bill'
import { useUserStore } from '@/stores/user'
import { useSessionStore } from '@/stores/session'
import { computed, onMounted } from 'vue'
import { useSessionSocket } from '@/composables/useSessionSocket'

const emit = defineEmits(['setPage'])
const billStore = useBillStore()
const userStore = useUserStore()
const sessionStore = useSessionStore()

let sessionSocket = useSessionSocket()

const hasSelected = computed(() => {
  return userStore.calculateTotal() > 0
})

function formatCurrency(value: number): string {
  let formattedValue = value.toFixed(2).replace('.', ',')
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${formattedValue}`
}

//handle link tab
const linkBill = () => {
  sessionSocket.ready(
    userStore.user.id,
    userStore.user.items.map(({ id, name, quantity }) => ({
      id,
      name,
      quantity,
    }))
  )
  userStore.user.ready = true
}
</script>
<template>
  <div
    v-if="sessionStore.session"
    class="w-full flex flex-col gap-4 items-center justify-start px-6 pt-24 pb-48"
  >
    <div
      class="h-24 w-full flex px-4 overflow-x-auto flex-row items-center justify-between gap-4 cartoon-border bg-white text-left rounded-2xl"
    >
      <div class="flex flex-row gap-4 items-center">
        <div class="w-16 h-16 bg-secondary rounded-full cartoon-border"></div>
        <div class="flex flex-col text-left">
          <h1 class="text-xl">Cód. {{ sessionStore.session.code }}</h1>
          <p>{{ sessionStore.session.name }}</p>
        </div>
      </div>
      <button
        v-if="false"
        @click=""
        class="h-12 w-12 shrink-0 !rounded-full bg-white focus:bg-primary flex flex-col items-center justify-center button-style"
      >
        <i class="mdi mdi-share-variant-outline text-3xl"></i>
      </button>
    </div>
    <div
      class="h-20 w-full flex px-6 overflow-x-auto flex-row items-center gap-4 cartoon-border drop-shadow-cartoon bg-white text-left rounded-2xl"
    >
      <div
        v-for="user in sessionStore.usersJoined"
        class="flex flex-col gap-1 w-16 items-center"
      >
        <div class="w-9 h-9 bg-secondary rounded-full cartoon-border"></div>
        <p class="text-[0.65rem] h-5 text-center leading-[0.65rem]">
          {{ user.name }}
        </p>
      </div>
    </div>
    <div
      class="py-2 w-full flex flex-col gap-4 cartoon-border bg-secondary text-left rounded-2xl"
    >
      <span
        class="text-3xl font-black shrink-0 text-center font-urbanist transition-all"
      >
        {{ formatCurrency(billStore.calculateTotal()) }}
      </span>
    </div>
    <div
      class="py-6 w-full flex flex-col gap-4 cartoon-border drop-shadow-cartoon bg-white text-left rounded-2xl"
    >
      <div class="w-full text-left px-4">
        <h1>Comanda</h1>
      </div>
      <div class="w-full flex flex-col gap-3 px-4">
        <div class="flex flex-row text-sm items-start h-6 gap-4">
          <span class="w-full text-left font-urbanist font-black">Item</span>
          <span class="text-center shrink-0 font-urbanist font-black w-8"
            >Qtd</span
          >
          <span class="text-center shrink-0 font-urbanist font-black w-14"
            >Preço</span
          >
          <span class="text-center font-urbanist shrink-0 font-black pr-2 w-20"
            >Seleção</span
          >
        </div>
        <transition-group
          name="fade"
          tag="div"
          class="flex w-full flex-col gap-3"
        >
          <div
            v-for="(item, i) in userStore.user.items"
            :key="item.id"
            class="flex flex-row w-full h-6 items-center gap-3"
          >
            <p class="text-xs w-full">{{ item.name }}</p>
            <p class="text-xs w-8 text-center shrink-0">
              {{ billStore.bill.items[i].quantity }}
            </p>
            <p class="text-xs w-14 text-right shrink-0">
              {{
                item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }}
            </p>
            <div
              class="text-center shrink-0 font-urbanist overflow-hidden flex flex-row justify-center items-center font-black w-20 h-6 border mx-1 border-black rounded-full"
            >
              <button class="w-6 pl-1 shrink-0 rounded-full">
                <i
                  @click="
                    userStore.user.items[i].quantity > 0
                      ? userStore.user.items[i].quantity--
                      : 0
                  "
                  class="mdi mdi-minus"
                ></i>
              </button>
              <input
                type="number"
                disabled
                v-model="userStore.user.items[i].quantity"
                class="px-2 text-center focus:outline-0 bg-secondary w-full h-6 rounded-full text-xs"
              />
              <button
                @click="
                  userStore.user.items[i].quantity <
                  billStore.bill.items[i].quantity
                    ? userStore.user.items[i].quantity++
                    : 0
                "
                class="w-6 pr-1 shrink-0 rounded-r-full"
              >
                <i class="mdi mdi-plus"></i>
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="w-full pb-0 flex flex-col gap-8 mt-4">
      <div class="w-full flex flex-col gap-4 items-center">
        <div class="flex flex-row w-full items-center gap-4 justify-between">
          <span
            class="text-3xl text-center w-full font-black font-urbanist transition-all"
          >
            Seu Total: {{ formatCurrency(userStore.calculateTotal()) }}
          </span>
        </div>
        <span
          v-if="!hasSelected || sessionStore.usersJoined.length < 2"
          class="text-red-600"
        >
          {{
            !hasSelected
              ? 'Finalize sua seleção antes'
              : 'Espere pelo menos mais uma pessoa entrar na sessão'
          }}</span
        >
        <button
          @click="linkBill()"
          :disabled="!hasSelected || sessionStore.usersJoined.length < 2"
          :class="
            !hasSelected || sessionStore.usersJoined.length < 2
              ? 'text-zinc-500 bg-zinc-300 border-zinc-500 !filter-none translate-y-[3px]'
              : 'bg-secondary focus:bg-primary'
          "
          class="w-full py-2 flex flex-col items-center !ease-in-out !duration-700 justify-center button-style"
        >
          <h1 class="text-xl">Finalizar</h1>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Definindo as animações de entrada e saída */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0 transform scale-95;
}
.fade-enter-to,
.fade-leave-from {
  @apply opacity-100 transform scale-100;
}
</style>
