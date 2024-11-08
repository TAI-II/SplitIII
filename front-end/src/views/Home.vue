<script setup lang="ts">
import Select from '@/components/Session/Select.vue'
import CreateSession from '@/components/Session/Create.vue'
import EnterSession from '@/components/Session/Enter.vue'
import SelectBillCreationMethod from '@/components/Session/Bill/SelectBillCreationMethod.vue'
import CreateBillManualInsertion from '@/components/Session/Bill/ManualInsertion/CreateBill.vue'
import TransitionWrapper from '@/components/library/TransitionWrapper.vue'
import { Record, ref } from 'vue'

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
</script>
<template>
  <div class="w-full flex flex-col px-6 items-center justify-center">
    <TransitionWrapper :name="transition">
      <component :is="pages[currentPage]" @setPage="setPage"></component>
    </TransitionWrapper>
  </div>
</template>
