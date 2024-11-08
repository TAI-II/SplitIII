<script lang="ts" setup>
const emit = defineEmits(['closeModal']);
const closeModal = () => {
  emit('closeModal');
};

const modal = ref(null);
onClickOutside(modal, closeModal);
</script>
<template>
  <div
    class="bg-zinc-700-10 fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm"
  >
    <div class="relative h-full w-full">
      <div
        ref="modal"
        class="absolute right-[50%] top-12 z-40 flex max-h-[80%] translate-x-1/2 flex-col rounded-2xl border border-zinc-300 bg-white shadow-lg max-lg:w-[90%] lg:top-[50%] lg:-translate-y-1/2"
      >
        <button
          @click="closeModal()"
          class="absolute -right-12 top-0 z-50 rounded-full border border-zinc-400 bg-zinc-50 px-2 py-1 shadow-sm hover:bg-red-100 max-lg:-right-4 max-lg:-top-4"
        >
          <i class="mdi mdi-close text-xl text-red-600"></i>
        </button>
        <div
          class="z-30 w-full rounded-t-2xl border-b border-zinc-400 bg-zinc-50 p-6"
        >
          <slot name="title"></slot>
        </div>

        <div class="overflow-y-auto rounded-b-2xl max-lg:h-full">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
