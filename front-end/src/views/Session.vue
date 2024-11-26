<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue'
import { useBillStore } from '@/stores/bill'
import { useUserStore } from '../stores/user'
import { useRoute } from 'vue-router'
import { useSessionSocket } from '../composables/useSessionSocket'
import { useSessionStore } from '../stores/session'
import DivideSession from '../components/Session/DivideSession.vue'
import Modal from '../components/library/Modal.vue'
import Ready from '../components/Session/Ready.vue'
import TransitionWrapper from '@/components/library/TransitionWrapper.vue'
import Result from '../components/Session/Result.vue'

const emit = defineEmits(['setPage'])
const sessionStore = useSessionStore()
const billStore = useBillStore()
const userStore = useUserStore()
let sessionSocket = useSessionSocket()
const route = useRoute()
onMounted(async () => {
  console.log('user: ', userStore.user)
  if (userStore.user && sessionStore.session) {
    await sessionStore.fetchSession(route.params.code as string)
    await sessionSocket.joinSession(userStore.user.id)
    console.log('bill: ', billStore.bill)
    console.log('sessionsocket: ', sessionSocket)
  }
})
</script>
<template>
  <div class="w-full">
    <TransitionWrapper name="slide-in-bottom-fade-out">
      <div
        v-if="userStore.user?.ready"
        class="bg-zinc-700-10 fixed left-0 top-0 z-50 h-full w-full backdrop-blur-md"
      >
        <div
          :class="
            sessionStore.status == 'progress'
              ? 'bg-primary'
              : sessionStore.status == 'success'
                ? 'bg-secondary'
                : 'bg-white'
          "
          class="absolute transition-all right-[50%] top-[50%] py-6 px-4 gap-3 -translate-y-1/2 z-40 flex translate-x-1/2 flex-col max-lg:w-[90%] rounded-2xl shadow-lg cartoon-border"
        >
          <Ready v-if="sessionStore.status == 'progress'" />
          <Result v-else />
        </div>
      </div>
    </TransitionWrapper>
    <DivideSession />
  </div>
</template>
<style scoped></style>
