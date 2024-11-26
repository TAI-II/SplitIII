<script setup lang="ts">
export type AnimationType =
  | 'bounce'
  | 'fade'
  | 'slide-in-bottom-fade-out'
  | 'slide-in-bottom-out-none'
  | 'slide-in-bottom'
  | 'slide-in-left'
  | 'slide-in-left-out-right'
  | 'slide-in-right'
  | 'slide-in-right-out-left'
  | 'slide-in-top'
  | 'fade-from-top'
  | 'expand'

interface Props {
  name: AnimationType
  mode?: 'default' | 'out-in' | 'in-out'
}
withDefaults(defineProps<Props>(), {
  mode: 'out-in',
})
</script>

<template>
  <Transition :name="name" :mode="mode">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.slide-in-right-enter-active {
  animation: slide-in-right 0.5s;
}
.slide-in-right-leave-active {
  animation: slide-in-right 0.5s reverse;
}

.slide-in-right-out-left-enter-active {
  animation: slide-in-right 0.5s;
}
.slide-in-right-out-left-leave-active {
  animation: slide-in-left 0.5s reverse;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-in-left-enter-active {
  animation: slide-in-left 0.5s;
}
.slide-in-left-leave-active {
  animation: slide-in-left 0.5s reverse;
}

.slide-in-left-out-right-enter-active {
  animation: slide-in-left 0.5s;
}
.slide-in-left-out-right-leave-active {
  animation: slide-in-right 0.5s reverse;
}
@keyframes slide-in-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-in-bottom-enter-active {
  animation: slide-in-bottom 0.5s;
}
.slide-in-bottom-leave-active {
  animation: slide-in-bottom 0.5s reverse;
}
@keyframes slide-in-bottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.slide-in-bottom-out-none-enter-active {
  animation: slide-in-bottom 0.5s;
}
.slide-in-bottom-out-none-leave-active {
  animation: none;
}

.slide-in-bottom-fade-out-enter-active {
  animation:
    slide-in-bottom 0.5s,
    fade 0.5s ease-in-out;
}
.slide-in-bottom-fade-out-leave-active {
  animation: fade 0.5s reverse ease-in-out;
}

.slide-in-top-enter-active {
  animation: slide-in-top 0.5s;
}
.slide-in-top-leave-active {
  animation: slide-in-top 0.5s reverse;
}
@keyframes slide-in-top {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.fade-enter-active {
  animation: fade 0.5s ease-in-out;
}
.fade-leave-active {
  animation: fade 0.5s reverse ease-in-out;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-from-top-enter-active {
  animation: fade-from-top 0.5s ease-in-out;
}
.fade-from-top-leave-active {
  animation: fade-from-top 0.5s reverse ease-in-out;
}
@keyframes fade-from-top {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition:
    height 0.5s ease,
    opacity 0.5s ease;
}
.expand-enter, .expand-leave-to /* .expand-leave-active in <2.1.8 */ {
  height: 0;
  opacity: 0;
}
</style>
