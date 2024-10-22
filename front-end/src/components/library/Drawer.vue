<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import type { AnimationType } from '@/components/library/TransitionWrapper.vue';

export type positions =
  | 'left'
  | 'bottom'
  | 'top'
  | 'right'
  | 'fullscreen'
  | 'center'
  | 'center-fit';

interface Props {
  position?: positions;
  backgroundColorClass?: string;
  permanent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  backgroundColorClass: 'bg-white',
});

const positionClasses: Record<positions, string> = {
  left: 'left-0 top-0 !h-full rounded-r-2xl min-w-[300px]',
  bottom: 'left-0 bottom-0 !h-[80%] md:h-[400px] !w-full rounded-t-2xl',
  top: 'left-0 top-0 !h-[80%] md:h-[400px] !w-full rounded-b-2xl',
  right: 'right-0 top-0 !h-full rounded-l-2xl',
  fullscreen: 'left-0 bottom-0 !h-full !w-full',
  center:
    '!h-[80%] md:h-[400px] w-[90%] md:w-[80%] xl:w-[1000px] rounded-t-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  'center-fit':
    'h-min-[100px] w-min-[100%] w-fit h-fit rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
};

const positionClass = computed(() => {
  return positionClasses[props.position];
});

const transitions: Record<positions, AnimationType> = {
  left: 'slide-in-left',
  bottom: 'slide-in-bottom',
  top: 'slide-in-top',
  right: 'slide-in-right',
  fullscreen: 'slide-in-bottom',
  center: 'fade',
  'center-fit': 'fade',
};

const transitionName = computed(() => {
  return transitions[props.position];
});

const activate = ref(false);

function close() {
  activate.value = false;
}
function open() {
  activate.value = true;
}
function toggle() {
  activate.value = !activate.value;
}

defineExpose({
  close,
  open,
  toggle,
});

const drawer = ref(null);

onClickOutside(drawer, () => {
  return !props.permanent ? close() : 0;
});
</script>

<template>
  <LibraryTransitionWrapper :name="transitionName">
    <div
      ref="drawer"
      v-if="activate"
      class="fixed z-[999] overflow-y-auto shadow-xl"
      :class="[positionClass, backgroundColorClass]"
    >
      <slot></slot>
    </div>
  </LibraryTransitionWrapper>
  <LibraryTransitionWrapper name="fade">
    <div
      v-if="activate"
      class="bg-pink-600-20 fixed left-0 top-0 z-[998] h-full w-full backdrop-blur-sm"
    ></div>
  </LibraryTransitionWrapper>
</template>
