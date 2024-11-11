import Select from '../components/Session/Select.vue'
import CreateSession from '../components/Session/Create.vue'
import EnterSession from '../components/Session/Enter.vue'
import SelectBillCreationMethod from '../components/Session/Bill/SelectBillCreationMethod.vue'
import CreateBillManualInsertion from '../components/Session/Bill/ManualInsertion/CreateBill.vue'
import TransitionWrapper from '../components/library/TransitionWrapper.vue'
import { ref, computed } from 'vue'
const {
  defineProps,
  defineSlots,
  defineEmits,
  defineExpose,
  defineModel,
  defineOptions,
  withDefaults,
} = await import('vue')
const pages = {
  select: Select,
  createSession: CreateSession,
  enterSession: EnterSession,
  selectBillCreationMethod: SelectBillCreationMethod,
  createBillManualInsertion: CreateBillManualInsertion,
}
const currentPage = ref('select')
const progressOrder = ref([
  'createSession',
  'selectBillCreationMethod',
  'createBillManualInsertion',
])
const transition = ref('slide-in-right-out-left')
const setPage = (newPage, isReturn) => {
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
const __VLS_fnComponent = (await import('vue')).defineComponent({})
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
  )({ ...{ class: 'w-full flex flex-col px-6 items-center justify-center' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{ class: 'absolute top-12 w-[85%] h-4 rounded-full cartoon-border' },
    ...{
      class:
        __VLS_ctx.progressOrder.indexOf(__VLS_ctx.currentPage) == -1
          ? 'opacity-0'
          : '',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{
      class:
        'h-full rounded-full transition-all ease-in-out duration-700 bg-secondary',
    },
    ...{ style: `width: ${__VLS_ctx.getWidth}%;` },
  })
  // @ts-ignore
  ;[TransitionWrapper, TransitionWrapper]
  // @ts-ignore
  const __VLS_0 = __VLS_asFunctionalComponent(
    TransitionWrapper,
    new TransitionWrapper({ name: __VLS_ctx.transition })
  )
  const __VLS_1 = __VLS_0(
    { name: __VLS_ctx.transition },
    ...__VLS_functionalComponentArgsRest(__VLS_0)
  )
  const __VLS_5 = __VLS_ctx.pages[__VLS_ctx.currentPage]
  // @ts-ignore
  const __VLS_6 = __VLS_asFunctionalComponent(
    __VLS_5,
    new __VLS_5({ ...{ onSetPage: {} } })
  )
  const __VLS_7 = __VLS_6(
    { ...{ onSetPage: {} } },
    ...__VLS_functionalComponentArgsRest(__VLS_6)
  )
  let __VLS_11
  const __VLS_12 = {
    onSetPage: __VLS_ctx.setPage,
  }
  let __VLS_8
  let __VLS_9
  const __VLS_10 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)
  __VLS_nonNullable(__VLS_4.slots).default
  const __VLS_4 = __VLS_pickFunctionalComponentCtx(TransitionWrapper, __VLS_1)
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['px-6']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['absolute']
  __VLS_styleScopedClasses['top-12']
  __VLS_styleScopedClasses['w-[85%]']
  __VLS_styleScopedClasses['h-4']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['cartoon-border']
  __VLS_styleScopedClasses['h-full']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['ease-in-out']
  __VLS_styleScopedClasses['duration-700']
  __VLS_styleScopedClasses['bg-secondary']
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
      TransitionWrapper: TransitionWrapper,
      pages: pages,
      currentPage: currentPage,
      progressOrder: progressOrder,
      transition: transition,
      setPage: setPage,
      getWidth: getWidth,
    }
  },
})
export default (await import('vue')).defineComponent({
  setup() {
    return {}
  },
})
