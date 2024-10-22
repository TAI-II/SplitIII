<script setup lang="ts">
import Select from '@/components/Select.vue'
import CreateSession from '@/components/Session/Create.vue'
import EnterSession from '@/components/Session/Enter.vue'
import TransitionWrapper from '@/components/library/TransitionWrapper.vue'
import { Record, ref } from 'vue'

type Pages = 'select' | 'createSession' | 'enterSession'
const pages: Record<Pages, any> = {
  select: Select,
  createSession: CreateSession,
  enterSession: EnterSession,
}
const currentPage = ref<Pages>('select')

const setPage = (newPage: Pages) => {
  setTimeout(() => {
    currentPage.value = newPage
  }, 300)
}
</script>
<template>
  <div class="h-screen w-full flex flex-col px-6 items-center justify-center">
    <TransitionWrapper name="slide-in-right-out-left">
      <component :is="pages[currentPage]" @setPage="setPage"></component>
    </TransitionWrapper>
  </div>
</template>
