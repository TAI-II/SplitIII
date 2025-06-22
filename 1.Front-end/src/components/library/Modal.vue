<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const emit = defineEmits(['closeModal'])
const closeModal = () => {
  emit('closeModal')
}

interface Props {
  customClasses?: string
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  persistent: true,
  customClasses: 'rounded-2xl bg-white shadow-lg',
})

const modal = ref(null)
onClickOutside(modal, closeModal)
</script>
<template>
  <div class="relative h-full w-full">
    <div
      ref="modal"
      :class="customClasses"
      class="absolute right-[50%] top-12 z-40 flex max-h-[80%] translate-x-1/2 flex-col max-lg:w-[90%] lg:top-[50%] lg:-translate-y-1/2"
    >
      <button
        v-if="!persistent"
        @click="closeModal()"
        class="absolute -right-12 top-0 z-50 rounded-full border border-zinc-400 bg-zinc-50 px-2 py-1 shadow-sm hover:bg-red-100 max-lg:-right-4 max-lg:-top-4"
      >
        <i class="mdi mdi-close text-xl text-red-600"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>
