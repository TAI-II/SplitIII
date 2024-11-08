<script setup lang="ts">
import Select from '@/components/Session/Select.vue'
import CreateSession from '@/components/Session/Create.vue'
import EnterSession from '@/components/Session/Enter.vue'
import SelectBillCreationMethod from '@/components/Session/Bill/SelectBillCreationMethod.vue'
import CreateBillManualInsertion from '@/components/Session/Bill/ManualInsertion/CreateBill.vue'
import TransitionWrapper from '@/components/library/TransitionWrapper.vue'
import { Record, ref, computed } from 'vue'

type Pages =
  | 'select'
  | 'createSession'
  | 'enterSession'
  | 'selectBillCreationMethod'
  | 'createBillManualInsertion'
const pages: Record<Pages, any> = {
  select: Select,
  createSession: CreateSession,
  enterSession: EnterSession,
  selectBillCreationMethod: SelectBillCreationMethod,
  createBillManualInsertion: CreateBillManualInsertion,
}
const currentPage = ref<Pages>('select')

const progressOrder = ref<Pages[]>([
  'createSession',
  'selectBillCreationMethod',
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
