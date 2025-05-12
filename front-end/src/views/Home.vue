<script setup lang="ts">
import Select from '@/components/Home/Select.vue'
import CreateSession from '@/components/Home/Create.vue'
import EnterSession from '@/components/Home/Enter.vue'
import SelectBillCreationMethod from '@/components/Home/Bill/SelectBillCreationMethod.vue'
import CreateBillManualInsertion from '@/components/Home/Bill/ManualInsertion/CreateBill.vue'
import TransitionWrapper from '@/components/library/TransitionWrapper.vue'
import TakePhoto from '@/components/Home/Bill/Ocr/TakePhoto.vue'
import { useSessionStore } from '@/stores/session'
import { useUserStore } from '@/stores/user'
import { useBillStore } from '@/stores/bill'
import { Record, ref, computed, onMounted } from 'vue'

type Pages =
  | 'select'
  | 'createSession'
  | 'enterSession'
  | 'selectBillCreationMethod'
  | 'createBillManualInsertion'
  | 'takePhoto'
const pages: Record<Pages, any> = {
  select: Select,
  createSession: CreateSession,
  enterSession: EnterSession,
  selectBillCreationMethod: SelectBillCreationMethod,
  createBillManualInsertion: CreateBillManualInsertion,
  takePhoto: TakePhoto,
}
const currentPage = ref<Pages>('select')

const progressOrder = ref<Pages[]>([
  'createSession',
  'selectBillCreationMethod',
  'takePhoto',
  'createBillManualInsertion',
])

const transition = ref<'slide-in-right-out-left' | 'slide-in-left-out-right'>(
  'slide-in-right-out-left'
)
const setPage = (newPage: Pages, isReturn?: boolean) => {
  transition.value = 'slide-in-right-out-left'
  let delay = 300
  if (isReturn) {
    transition.value = 'slide-in-left-out-right'
    delay = 0
  }
  setTimeout(() => {
    currentPage.value = newPage
  }, delay)
}

const getWidth = computed(() => {
  return Math.round(
    ((progressOrder.value.indexOf(currentPage.value) + 1) /
      progressOrder.value.length) *
      100
  )
})

const sessionStore = useSessionStore()
const userStore = useUserStore()
const billStore = useBillStore()
onMounted(() => {
  sessionStore.session = null
  userStore.user = null
  billStore.bill = {
    items: [
      {
        id: '1',
        name: '',
        quantity: 0,
        price: 0,
      },
    ],
    aditionalCosts: {
      tip: null,
      couvert: null,
    },
  }
})
</script>
<template>
  <div class="w-full flex flex-col px-6 items-center justify-center">
    <div
      class="absolute top-12 w-[85%] h-4 rounded-full cartoon-border"
      :class="progressOrder.indexOf(currentPage) == -1 ? 'opacity-0' : ''"
    >
      <div
        class="h-full rounded-full transition-all ease-in-out duration-700 bg-secondary"
        :style="`width: ${getWidth}%;`"
      ></div>
    </div>
    <TransitionWrapper :name="transition">
      <component :is="pages[currentPage]" @setPage="setPage"></component>
    </TransitionWrapper>
  </div>
</template>
