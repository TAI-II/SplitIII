<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'
import apiClient from '@/composables/useApi'
// import { useBillStore } from '@/stores/bill'
import { useUserStore } from '@/stores/user'
// import { useRoute } from 'vue-router'
// import { useSessionSocket } from '@/composables/useSessionSocket'
import { useSessionStore } from '@/stores/session'
// import DivideSession from '../components/Session/DivideSession.vue'
// import Modal from '../components/library/Modal.vue'

const emit = defineEmits(['setPage'])
const sessionStore = useSessionStore()
// const billStore = useBillStore()
const userStore = useUserStore()
// const route = useRoute()
// let sessionSocket = useSessionSocket()
const result = ref<'loading' | 'success' | 'wrong'>('loading')
const wrongItems = ref<any>()
const totalItems = ref<any>()
const sessionUsers = ref<any>()
onMounted(async () => {
  setTimeout(async () => {
    const response = await apiClient.get(`/sessions/${sessionStore.session.id}`)
    console.log('Result session fetch: ', response.data)
    totalItems.value = response.data.tab.items
    sessionUsers.value = response.data.sessionUsers
    const divisionResult = calculateTotalSelection(
      response.data.sessionUsers,
      totalItems.value
    )
    console.log(divisionResult)
    if (divisionResult == 'success') {
      result.value = 'success'
      sessionStore.status = 'success'
    } else {
      wrongItems.value = divisionResult.filteredItemsStatus
      result.value = 'wrong'
    }
  }, 3000)
})

const restartSession = async () => {
  const response = await apiClient.post(
    `/sessions/${sessionStore.session.id}/reset`
  )
  console.log('restart session: ', response)
  sessionStore.status = 'progress'
}

function calculateTotalSelection(users: any[], allItems: any[]): any {
  // Soma os itens selecionados por todos os usuários
  const totalSelection: Record<string, number> = {}

  users.forEach(user => {
    user.selectedItems.forEach((item: any) => {
      if (!totalSelection[item.id]) {
        totalSelection[item.id] = item.quantity
      } else {
        totalSelection[item.id] += item.quantity
      }
    })
  })

  // Verifica se todos os itens foram selecionados
  const itemsStatus: any[] = []
  allItems.forEach(item => {
    const selectedQuantity = totalSelection[item.id] || 0
    const missingQuantity = Math.max(0, item.quantity - selectedQuantity)
    const surplusQuantity = Math.max(0, selectedQuantity - item.quantity)

    itemsStatus.push({
      id: item.id,
      name: item.name,
      quantity: selectedQuantity,
      missingQuantity: missingQuantity,
      surplusQuantity: surplusQuantity,
      totalQuantity: item.quantity,
      price: item.price || 0,
    })
  })

  const filteredItemsStatus = itemsStatus.filter(
    item => item.missingQuantity > 0 || item.surplusQuantity > 0
  )

  if (filteredItemsStatus.length === 0) {
    return 'success'
  }

  return { filteredItemsStatus }
}

function calculateTotalValueDifference(
  filteredItemsStatus: {
    price: number
    missingQuantity: number
    surplusQuantity: number
  }[]
): string {
  let totalValue = 0

  filteredItemsStatus.forEach(item => {
    const missingValue = item.missingQuantity * item.price
    const surplusValue = item.surplusQuantity * item.price
    totalValue += missingValue - surplusValue
  })

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(totalValue))

  if (totalValue > 0) {
    return `Faltaram  <span class="text-lg text-red-600 font-urbanist font-black"> ${formattedValue} </span>  para o total da comanda`
  } else if (totalValue < 0) {
    return `Sobraram  <span class="text-lg text-red-600 font-urbanist font-black"> ${formattedValue} </span>  em relação ao total da comanda`
  } else {
    return 'O total da comanda está exato'
  }
}

function formatCurrency(value: number): string {
  let formattedValue = value.toFixed(2).replace('.', ',')
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${formattedValue}`
}
</script>
<template>
  <div class="animate-spin" v-if="result == 'loading'">
    <i class="mdi mdi-loading text-4xl text-primary"></i>
  </div>
  <div v-if="result == 'success'" class="w-full flex flex-col gap-8">
    <h1>Divisão feita com sucesso!</h1>
    <div class="flex bg-grey flex-col gap-0 w-full rounded-lg px-4 py-3">
      <h3 class="text-sm text-left mb-4">Sua seleção</h3>
      <div class="flex flex-row text-sm items-start h-6 gap-1">
        <span class="w-full text-left font-urbanist text-xs font-black"
          >Item</span
        >
        <span class="text-center shrink-0 font-urbanist text-xs font-black w-6"
          >Qtd</span
        >
      </div>
      <transition-group
        name="fade"
        tag="div"
        class="flex w-full flex-col gap-2"
      >
        <div
          v-for="item in userStore.user.items"
          :key="item.id"
          class="flex flex-row w-full h-6 items-center gap-1"
        >
          <p class="text-[0.65rem] w-full truncate">{{ item.name }}</p>
          <p class="text-[0.65rem] w-6 text-center shrink-0">
            {{ item.quantity }}
          </p>
        </div>
      </transition-group>
    </div>
    <div class="flex flex-col gap-2 w-full text-center">
      <h3>Seu total</h3>
      <span
        class="flex font-urbanist text-2xl font-black items-center justify-center h-14 cartoon-border w-full rounded-2xl bg-white"
        >{{ formatCurrency(userStore.calculateTotal()) }}</span
      >
    </div>
  </div>
  <div v-if="result == 'wrong'" class="w-full flex flex-col gap-3">
    <h1 class="underline underline-offset-2 decoration-red-600">
      A divisão não deu certo
    </h1>
    <h3 class="text-left">Items com divisão incorreta:</h3>

    <div class="w-full flex flex-col bg-grey gap-3 rounded-lg p-4">
      <div class="flex flex-row text-sm items-start h-6 gap-4">
        <span class="w-full text-left font-urbanist font-black">Item</span>
        <span class="text-center shrink-0 font-urbanist font-black w-8"
          >Qtd</span
        >
        <span class="text-right shrink-0 font-urbanist font-black w-20"
          >Preço (un)</span
        >
      </div>

      <div
        v-for="item in wrongItems"
        :key="item.id"
        class="flex flex-row w-full h-6 items-center gap-4"
      >
        <p class="text-xs w-full truncate">{{ item.name }}</p>
        <p class="text-xs w-8 text-center shrink-0">
          <span class="text-red-600 font-bold text-sm">{{
            item.quantity
          }}</span>
          /{{ item.totalQuantity }}
        </p>
        <p class="text-xs w-20 text-right shrink-0">
          {{
            item.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          }}
        </p>
      </div>
    </div>
    <span v-html="calculateTotalValueDifference(wrongItems)"></span>

    <h3 class="text-left">Itens selecionados:</h3>

    <div
      class="w-full flex flex-row overflow-x-auto pb-2 overflow-hidden gap-3"
    >
      <div
        v-for="user in sessionUsers"
        class="flex flex-col gap-0 shrink-0 w-36 rounded-lg px-4 py-3"
        :class="user.userId == userStore.user.id ? 'bg-secondary' : 'bg-grey'"
      >
        <h3 class="text-sm text-left mb-4">
          {{ user.userId == userStore.user.id ? 'Você' : user.name }}
        </h3>
        <div class="flex flex-row text-sm items-start h-6 gap-1">
          <span class="w-full text-left font-urbanist text-xs font-black"
            >Item</span
          >
          <span
            class="text-center shrink-0 font-urbanist text-xs font-black w-6"
            >Qtd</span
          >
        </div>
        <transition-group
          name="fade"
          tag="div"
          class="flex w-full flex-col gap-2"
        >
          <div
            v-for="(item, i) in user.selectedItems"
            :key="item.id"
            class="flex flex-row w-full h-6 items-center gap-1"
          >
            <p class="text-[0.65rem] w-full truncate">{{ item.name }}</p>
            <p class="text-[0.65rem] w-6 text-center shrink-0">
              {{ item.quantity }}
            </p>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="flex flex-col gap-2 w-full text-left">
      <h3>Sua seleção totalizou</h3>
      <span
        class="flex font-urbanist text-2xl font-black items-center justify-center h-14 cartoon-border w-full rounded-2xl bg-primary"
        >{{ formatCurrency(userStore.calculateTotal()) }}</span
      >
    </div>
    <div v-if="false" class="flex flex-col gap-2 w-full text-left">
      <h3>E aí adm? Querem tentar dividir de novo?</h3>
      <button
        @click="restartSession"
        class="w-full bg-secondary focus:bg-primary py-2 flex flex-col items-center !ease-in-out !duration-700 justify-center button-style"
      >
        <h1 class="text-xl">Reiniciar</h1>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
