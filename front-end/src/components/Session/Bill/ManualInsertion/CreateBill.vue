<script setup lang="ts">
import { useBillStore } from '@/stores/bill'
import { useSessionStore } from '@/stores/session'
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleButton from '@/components/library/ToggleButton.vue'

const emit = defineEmits(['setPage'])
const billStore = useBillStore()
const sessionStore = useSessionStore()

const lastItem = computed(() => {
  return !billStore.bill.items || billStore.bill.items.length < 2
})

const allItemsValid = computed(() => {
  return billStore.bill.items.every(
    (item: any) => item.name !== '' && item.price > 0 && item.quantity > 0
  )
})

function formatCurrency(value: number): string {
  let formattedValue = value.toFixed(2).replace('.', ',')
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `R$ ${formattedValue}`
}

// handle price
function formatDisplayPrice(value: number): string {
  let cleanValue = value.toFixed(2).replace('.', ',')
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function onPriceInput(value: string, index: number) {
  let cleanValue = value.replace(/\D/g, '')
  const numericValue = parseFloat(cleanValue) / 100
  billStore.bill.items[index].price = numericValue
}

function formatedPrice(price: number): string {
  price = price || 0
  return formatDisplayPrice(price)
}

function allowOnlyNumbers(event: KeyboardEvent) {
  const key = event.key
  if (!/^\d$/.test(key)) {
    event.preventDefault()
  }
}

//handle tip
const hasTip = ref<boolean>(false)
function onTipInput(event: Event) {
  const input = event.target as HTMLInputElement
  const numericValue = parseInt(input.value.replace(/\D/g, '').slice(0, 2), 10)
  billStore.bill.aditionalCosts.tip = isNaN(numericValue) ? 0 : numericValue // Define como 0 se o valor for NaN
}
watch(
  () => hasTip.value,
  () => {
    if (!hasTip.value) billStore.bill.aditionalCosts.tip = null
    else billStore.bill.aditionalCosts.tip = 10
  }
)

//handle couvert
const hasCouvert = ref<boolean>(false)
function onCouvertInput(value: string) {
  let cleanValue = value.replace(/\D/g, '')
  const numericValue = parseFloat(cleanValue) / 100
  billStore.bill.aditionalCosts.couvert = numericValue
}
watch(
  () => hasCouvert.value,
  () => {
    if (!hasCouvert.value) billStore.bill.aditionalCosts.couvert = null
    else billStore.bill.aditionalCosts.couvert = 0
  }
)

//handle link tab
const router = useRouter()
const linkBill = async () => {
  await billStore.linkBill()
  router.push(`/sessao/${sessionStore.session.id}`)
}
</script>
<template>
  <div
    class="w-full flex flex-col gap-8 items-center justify-start pt-32 pb-48"
  >
    <div
      class="py-4 w-full flex flex-col gap-4 bg-white cartoon-border text-left rounded-xl"
    >
      <div class="w-full text-left px-4">
        <h1>Comanda</h1>
      </div>
      <div class="w-full flex flex-col pl-3 gap-3 px-4">
        <div class="flex flex-row items-start h-6 gap-2">
          <span class="w-full text-left font-urbanist font-black pl-6"
            >Item</span
          >
          <span class="text-center shrink-0 font-urbanist font-black w-20"
            >Qtd</span
          >
          <span class="text-center font-urbanist shrink-0 font-black w-20"
            >Preço (R$)</span
          >
        </div>
        <transition-group
          name="fade"
          tag="div"
          class="flex w-full flex-col gap-3"
        >
          <div
            v-for="(item, i) in billStore.bill.items"
            :key="item.id"
            class="flex flex-row w-full h-6 items-center gap-1"
          >
            <i
              @click="billStore.removeItem(i)"
              :class="lastItem ? 'opacity-0' : ''"
              class="mdi mdi-close text-xl text-red-500 font-black"
            ></i>
            <input
              :class="item.name == '' ? '' : 'bg-grey'"
              v-model="billStore.bill.items[i].name"
              class="w-full truncate text-left pl-1 focus:bg-grey transition-all hover:outline-0 border border-grey h-full rounded-md text-xs"
            />
            <div
              class="text-center shrink-0 font-urbanist overflow-hidden flex flex-row justify-center items-center font-black w-20 h-6 border mx-1 border-black rounded-full"
            >
              <button class="w-6 pl-1 shrink-0 rounded-full">
                <i
                  @click="
                    billStore.bill.items[i].quantity > 0
                      ? billStore.bill.items[i].quantity--
                      : 0
                  "
                  class="mdi mdi-minus"
                ></i>
              </button>
              <input
                type="number"
                disabled
                v-model="billStore.bill.items[i].quantity"
                :class="
                  billStore.bill.items[i].quantity == 0 ? 'text-red-600' : ''
                "
                class="px-2 text-center focus:outline-0 bg-secondary w-full h-6 rounded-full text-xs"
              />
              <button
                @click="billStore.bill.items[i].quantity++"
                class="w-6 pr-1 shrink-0 rounded-r-full"
              >
                <i class="mdi mdi-plus"></i>
              </button>
            </div>
            <input
              id="priceInput"
              type="text"
              :value="formatedPrice(billStore.bill.items[i].price)"
              @input="onPriceInput($event.target.value, i)"
              @keypress="allowOnlyNumbers($event)"
              :class="item.price == 0 ? '' : 'bg-grey'"
              class="w-20 h-full hover:bg-grey text-center transition-all hover:outline-0 border border-grey rounded-md text-xs"
            />
          </div>
        </transition-group>
      </div>
      <div class="flex w-full justify-center mt-6">
        <button
          @click="billStore.newItem()"
          class="h-12 w-12 shrink-0 !rounded-full bg-secondary focus:bg-primary flex flex-col items-center justify-center button-style"
        >
          <i class="mdi mdi-plus text-3xl"></i>
        </button>
      </div>
      <div class="w-full p-4 pb-0 flex flex-col gap-8">
        <div class="w-full flex flex-col gap-2 items-start">
          <span class="w-full text-left font-urbanist font-black"
            >Incluir adicionais?</span
          >
          <div class="flex flex-row w-full justify-between items-center">
            <p>Gorjeta (%)</p>
            <div class="flex flex-row items-center gap-2">
              <div
                :class="hasTip ? 'max-w-[50px]' : 'max-w-0'"
                class="transition-all relative overflow-hidden"
              >
                <input
                  id="percentageInput"
                  type="number"
                  v-model="billStore.bill.aditionalCosts.tip"
                  @input="onTipInput"
                  class="h-7 text- w-10 flex pl-2 transition-all over bg-grey hover:outline-0 rounded-md text-xs"
                />
                <span
                  class="absolute right-1 top-1/2 mt-[1px] transform -translate-y-1/2 text-xs"
                  >%</span
                >
              </div>
              <ToggleButton v-model="hasTip" />
            </div>
          </div>
          <!-- <div class="flex flex-row w-full justify-between items-center">
            <p>Couvert (R$)</p>
            <div class="flex flex-row items-center gap-2">
              <input
                id="priceInput"
                type="text"
                :value="formatedPrice(billStore.bill.aditionalCosts.couvert)"
                @input="onCouvertInput($event.target.value)"
                :class="hasCouvert ? 'max-w-[60px]' : 'max-w-0 opacity-0'"
                class="h-7 bg-grey text-center transition-all hover:outline-0 rounded-md text-xs"
              />

              <ToggleButton v-model="hasCouvert" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-4 items-center">
      <div class="flex flex-row items-center gap-4 justify-between">
        <span class="text-2xl font-black shrink-0 font-urbanist transition-all">
          Total: {{ formatCurrency(billStore.calculateTotal()) }}
        </span>
        <p
          :class="allItemsValid ? 'opacity-0' : ''"
          class="text-[0.7rem] text-red-500 transition-all leading-3"
        >
          Preencha todos campos dos produtos para dividir
        </p>
      </div>
      <button
        @click="linkBill()"
        :disabled="!allItemsValid"
        :class="
          !allItemsValid
            ? 'text-zinc-500 bg-zinc-300 border-zinc-500 !filter-none translate-y-[3px]'
            : 'bg-secondary focus:bg-primary'
        "
        class="w-full py-2 flex flex-col items-center !ease-in-out !duration-700 justify-center button-style"
      >
        <h1 class="text-lg">Dividir conta!</h1>
      </button>
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
