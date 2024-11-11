import { ref } from 'vue'
import { useSessionStore } from '../stores/session'
import { useUserStore } from '../stores/user'
const {
  defineProps,
  defineSlots,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  withDefaults,
} = await import('vue')
const emit = defineEmits(['setPage'])
const sessionStore = useSessionStore()
const userStore = useUserStore()
const session = ref('')
const name = ref('')
const errorMsg = ref('')
const createSession = async () => {
  if (session.value.length < 3)
    return (errorMsg.value = 'Digite o nome da sessão!')
  if (name.value.length < 3) return (errorMsg.value = 'Digite o seu nome!')
  errorMsg.value = ''
  await sessionStore.createSession(name.value, session.value)
  await userStore.createAdmin(name.value, sessionStore.session.creatorId)
  if (sessionStore.error) errorMsg.value = sessionStore.error
  else emit('setPage', 'selectBillCreationMethod')
}
const __VLS_fnComponent = (await import('vue')).defineComponent({
  emits: {},
})
let __VLS_functionalComponentProps
function __VLS_template() {
  const __VLS_ctx = {}
  const __VLS_localComponents = {
    ...{},
    ...{},
    ...__VLS_ctx,
  }
  let __VLS_components
  const __VLS_localDirectives = {
    ...{},
    ...__VLS_ctx,
  }
  let __VLS_directives
  let __VLS_styleScopedClasses
  let __VLS_resolvedLocalAndGlobalComponents
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{
      class: 'w-full h-screen flex flex-col gap-8 items-end justify-center',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{
      class:
        'w-full flex flex-col gap-4 items-start justify-center bg-white px-6 py-8 rounded-2xl',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.h1,
    __VLS_intrinsicElements.h1
  )({})
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p
  )({})
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex flex-col w-full gap-3 mt-2' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'relative w-full' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.i,
    __VLS_intrinsicElements.i
  )({
    ...{
      class:
        'mdi mdi-star-outline absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-2xl',
    },
  })
  __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
    placeholder: 'Nome da sessão',
    ...{
      class:
        'pl-14 py-3 border w-full border-black rounded-2xl focus:outline-none',
    },
  })
  __VLS_ctx.session
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'relative w-full' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.i,
    __VLS_intrinsicElements.i
  )({
    ...{
      class:
        'mdi mdi-account-outline absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-2xl',
    },
  })
  __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
    placeholder: 'Seu nome',
    ...{
      class:
        'pl-14 py-3 border w-full border-black rounded-2xl focus:outline-none',
    },
  })
  __VLS_ctx.name
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: 'text-xs text-red-600' } })
  __VLS_ctx.errorMsg
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.button,
    __VLS_intrinsicElements.button
  )({
    ...{
      onClick: (...[$event]) => {
        __VLS_ctx.createSession()
      },
    },
    ...{ class: 'w-full button-style h-14 bg-secondary hover:bg-primary' },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.h1,
    __VLS_intrinsicElements.h1
  )({})
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.button,
    __VLS_intrinsicElements.button
  )({
    ...{
      onClick: (...[$event]) => {
        __VLS_ctx.emit('setPage', 'select', true)
      },
    },
    ...{
      class:
        'w-12 h-12 border-[3px] flex items-center hover:bg-primary justify-center bg-white border-black rounded-full shrink-0',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.i,
    __VLS_intrinsicElements.i
  )({ ...{ class: 'mdi mdi-keyboard-return text-2xl' } })
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['h-screen']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-8']
  __VLS_styleScopedClasses['items-end']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-4']
  __VLS_styleScopedClasses['items-start']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['bg-white']
  __VLS_styleScopedClasses['px-6']
  __VLS_styleScopedClasses['py-8']
  __VLS_styleScopedClasses['rounded-2xl']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['gap-3']
  __VLS_styleScopedClasses['mt-2']
  __VLS_styleScopedClasses['relative']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-star-outline']
  __VLS_styleScopedClasses['absolute']
  __VLS_styleScopedClasses['left-4']
  __VLS_styleScopedClasses['top-1/2']
  __VLS_styleScopedClasses['transform']
  __VLS_styleScopedClasses['-translate-y-1/2']
  __VLS_styleScopedClasses['text-black']
  __VLS_styleScopedClasses['text-2xl']
  __VLS_styleScopedClasses['pl-14']
  __VLS_styleScopedClasses['py-3']
  __VLS_styleScopedClasses['border']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['border-black']
  __VLS_styleScopedClasses['rounded-2xl']
  __VLS_styleScopedClasses['focus:outline-none']
  __VLS_styleScopedClasses['relative']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-account-outline']
  __VLS_styleScopedClasses['absolute']
  __VLS_styleScopedClasses['left-4']
  __VLS_styleScopedClasses['top-1/2']
  __VLS_styleScopedClasses['transform']
  __VLS_styleScopedClasses['-translate-y-1/2']
  __VLS_styleScopedClasses['text-black']
  __VLS_styleScopedClasses['text-2xl']
  __VLS_styleScopedClasses['pl-14']
  __VLS_styleScopedClasses['py-3']
  __VLS_styleScopedClasses['border']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['border-black']
  __VLS_styleScopedClasses['rounded-2xl']
  __VLS_styleScopedClasses['focus:outline-none']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['text-red-600']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['button-style']
  __VLS_styleScopedClasses['h-14']
  __VLS_styleScopedClasses['bg-secondary']
  __VLS_styleScopedClasses['hover:bg-primary']
  __VLS_styleScopedClasses['w-12']
  __VLS_styleScopedClasses['h-12']
  __VLS_styleScopedClasses['border-[3px]']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['hover:bg-primary']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['bg-white']
  __VLS_styleScopedClasses['border-black']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-keyboard-return']
  __VLS_styleScopedClasses['text-2xl']
  var __VLS_slots
  var __VLS_inheritedAttrs
  const __VLS_refs = {}
  var $refs
  return {
    slots: __VLS_slots,
    refs: $refs,
    attrs: {},
  }
}
const __VLS_self = (await import('vue')).defineComponent({
  setup() {
    return {
      emit: emit,
      session: session,
      name: name,
      errorMsg: errorMsg,
      createSession: createSession,
    }
  },
  emits: {},
})
export default (await import('vue')).defineComponent({
  setup() {
    return {}
  },
  emits: {},
})
