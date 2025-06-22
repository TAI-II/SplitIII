<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
<template>
  <div
    class="w-10 h-6 flex items-center rounded-full cursor-pointer cartoon-border transition-all duration-300"
    :class="modelValue ? 'bg-secondary' : 'bg-grey'"
    @click="toggle"
  >
    <div
      class="bg-white w-6 h-6 rounded-full flex items-center justify-center cartoon-border shadow-md transform transition-transform duration-300"
      :class="modelValue ? 'translate-x-4' : '-translate-x-1'"
    >
      <div
        class="bg-grey w-[10px] h-[10px] rounded-full flex items-center justify-center cartoon-border shadow-md transform transition-transform duration-300"
      ></div>
    </div>
  </div>
</template>
