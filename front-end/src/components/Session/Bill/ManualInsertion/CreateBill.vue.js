import { useBillStore } from '../stores/bill'
import { useSessionStore } from '../stores/session'
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleButton from '../components/library/ToggleButton.vue'
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
const billStore = useBillStore()
const sessionStore = useSessionStore()
const lastItem = computed(() => {
  return !billStore.bill.items || billStore.bill.items.length < 2
})
const allItemsValid = computed(() => {
  return billStore.bill.items.every(
    item => item.name !== '' && item.price > 0 && item.quantity > 0
  )
})
function formatCurrency(value) {
  let formattedValue = value.toFixed(2).replace('.', ',')
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `R$ ${formattedValue}`
}
// handle price
function formatDisplayPrice(value) {
  let cleanValue = value.toFixed(2).replace('.', ',')
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
function onPriceInput(value, index) {
  let cleanValue = value.replace(/\D/g, '')
  const numericValue = parseFloat(cleanValue) / 100
  billStore.bill.items[index].price = numericValue
}
function formatedPrice(price) {
  price = price || 0
  return formatDisplayPrice(price)
}
function allowOnlyNumbers(event) {
  const key = event.key
  if (!/^\d$/.test(key)) {
    event.preventDefault()
  }
}
//handle tip
const hasTip = ref(false)
function onTipInput(event) {
  const input = event.target
  const numericValue = parseInt(input.value.replace(/\D/g, '').slice(0, 2), 10)
  billStore.bill.aditionalCosts.tip = isNaN(numericValue) ? 0 : numericValue // Define como 0 se o valor for NaN
}
watch(
  () => hasTip.value,
  () => {
    if (!hasTip.value) billStore.bill.aditionalCosts.tip = null
    else billStore.bill.aditionalCosts.tip = 10
  }
)
//handle couvert
const hasCouvert = ref(false)
function onCouvertInput(value) {
  let cleanValue = value.replace(/\D/g, '')
  const numericValue = parseFloat(cleanValue) / 100
  billStore.bill.aditionalCosts.couvert = numericValue
}
watch(
  () => hasCouvert.value,
  () => {
    if (!hasCouvert.value) billStore.bill.aditionalCosts.couvert = null
    else billStore.bill.aditionalCosts.couvert = 0
  }
)
//handle link tab
const router = useRouter()
const linkBill = async () => {
  await billStore.linkBill()
  router.push(`/sessao/${sessionStore.session.id}`)
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
  // CSS variable injection
  // CSS variable injection end
  let __VLS_resolvedLocalAndGlobalComponents
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{
      class:
        'w-full flex flex-col gap-8 items-center justify-start pt-32 pb-48',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{
      class:
        'py-4 w-full flex flex-col gap-4 bg-white cartoon-border text-left rounded-xl',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'w-full text-left px-4' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.h1,
    __VLS_intrinsicElements.h1
  )({})
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'w-full flex flex-col pl-3 gap-3 px-4' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex flex-row items-start h-6 gap-2' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: 'w-full text-left font-urbanist font-black pl-6' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: 'text-center shrink-0 font-urbanist font-black w-20' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: 'text-center font-urbanist shrink-0 font-black w-20' } })
  const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TransitionGroup
  /** @type { [typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ] } */
  // @ts-ignore
  const __VLS_1 = __VLS_asFunctionalComponent(
    __VLS_0,
    new __VLS_0({
      name: 'fade',
      tag: 'div',
      ...{ class: 'flex w-full flex-col gap-3' },
    })
  )
  const __VLS_2 = __VLS_1(
    { name: 'fade', tag: 'div', ...{ class: 'flex w-full flex-col gap-3' } },
    ...__VLS_functionalComponentArgsRest(__VLS_1)
  )
  for (const [item, i] of __VLS_getVForSourceType(
    __VLS_ctx.billStore.bill.items
  )) {
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({
      key: item.id,
      ...{ class: 'flex flex-row w-full h-6 items-center gap-1' },
    })
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.i,
      __VLS_intrinsicElements.i
    )({
      ...{
        onClick: (...[$event]) => {
          __VLS_ctx.billStore.removeItem(i)
        },
      },
      ...{ class: __VLS_ctx.lastItem ? 'opacity-0' : '' },
      ...{ class: 'mdi mdi-close text-xl text-red-500 font-black' },
    })
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
      ...{ class: item.name == '' ? '' : 'bg-grey' },
      ...{
        class:
          'w-full truncate text-left pl-1 focus:bg-grey transition-all hover:outline-0 border border-grey h-full rounded-md text-xs',
      },
    })
    __VLS_ctx.billStore.bill.items[i].name
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.div,
      __VLS_intrinsicElements.div
    )({
      ...{
        class:
          'text-center shrink-0 font-urbanist overflow-hidden flex flex-row justify-center items-center font-black w-20 h-6 border mx-1 border-black rounded-full',
      },
    })
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.button,
      __VLS_intrinsicElements.button
    )({ ...{ class: 'w-6 pl-1 shrink-0 rounded-full' } })
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.i,
      __VLS_intrinsicElements.i
    )({
      ...{
        onClick: (...[$event]) => {
          __VLS_ctx.billStore.bill.items[i].quantity > 0
            ? __VLS_ctx.billStore.bill.items[i].quantity--
            : 0
        },
      },
      ...{ class: 'mdi mdi-minus' },
    })
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
      type: 'number',
      disabled: true,
      ...{
        class:
          __VLS_ctx.billStore.bill.items[i].quantity == 0 ? 'text-red-600' : '',
      },
      ...{
        class:
          'px-2 text-center focus:outline-0 bg-secondary w-full h-6 rounded-full text-xs',
      },
    })
    __VLS_ctx.billStore.bill.items[i].quantity
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.button,
      __VLS_intrinsicElements.button
    )({
      ...{
        onClick: (...[$event]) => {
          __VLS_ctx.billStore.bill.items[i].quantity++
        },
      },
      ...{ class: 'w-6 pr-1 shrink-0 rounded-r-full' },
    })
    __VLS_elementAsFunction(
      __VLS_intrinsicElements.i,
      __VLS_intrinsicElements.i
    )({ ...{ class: 'mdi mdi-plus' } })
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
      ...{
        onInput: (...[$event]) => {
          __VLS_ctx.onPriceInput($event.target.value, i)
        },
      },
      ...{
        onKeypress: (...[$event]) => {
          __VLS_ctx.allowOnlyNumbers($event)
        },
      },
      id: 'priceInput',
      type: 'text',
      value: __VLS_ctx.formatedPrice(__VLS_ctx.billStore.bill.items[i].price),
      ...{ class: item.price == 0 ? '' : 'bg-grey' },
      ...{
        class:
          'w-20 h-full hover:bg-grey text-center transition-all hover:outline-0 border border-grey rounded-md text-xs',
      },
    })
  }
  __VLS_nonNullable(__VLS_5.slots).default
  const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex w-full justify-center mt-6' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.button,
    __VLS_intrinsicElements.button
  )({
    ...{
      onClick: (...[$event]) => {
        __VLS_ctx.billStore.newItem()
      },
    },
    ...{
      class:
        'h-12 w-12 shrink-0 !rounded-full bg-secondary focus:bg-primary flex flex-col items-center justify-center button-style',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.i,
    __VLS_intrinsicElements.i
  )({ ...{ class: 'mdi mdi-plus text-3xl' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'w-full p-4 pb-0 flex flex-col gap-8' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'w-full flex flex-col gap-2 items-start' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({ ...{ class: 'w-full text-left font-urbanist font-black' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex flex-row w-full justify-between items-center' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p
  )({})
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex flex-row items-center gap-2' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({
    ...{ class: __VLS_ctx.hasTip ? 'max-w-[50px]' : 'max-w-0' },
    ...{ class: 'transition-all relative overflow-hidden' },
  })
  __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
    ...{ onInput: __VLS_ctx.onTipInput },
    id: 'percentageInput',
    type: 'number',
    ...{
      class:
        'h-7 text- w-10 flex pl-2 transition-all over bg-grey hover:outline-0 rounded-md text-xs',
    },
  })
  __VLS_ctx.billStore.bill.aditionalCosts.tip
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({
    ...{
      class:
        'absolute right-1 top-1/2 mt-[1px] transform -translate-y-1/2 text-xs',
    },
  })
  // @ts-ignore
  ;[ToggleButton]
  // @ts-ignore
  const __VLS_6 = __VLS_asFunctionalComponent(
    ToggleButton,
    new ToggleButton({ modelValue: __VLS_ctx.hasTip })
  )
  const __VLS_7 = __VLS_6(
    { modelValue: __VLS_ctx.hasTip },
    ...__VLS_functionalComponentArgsRest(__VLS_6)
  )
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'w-full flex flex-col gap-4 items-center' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.div,
    __VLS_intrinsicElements.div
  )({ ...{ class: 'flex flex-row items-center gap-4 justify-between' } })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.span,
    __VLS_intrinsicElements.span
  )({
    ...{ class: 'text-2xl font-black shrink-0 font-urbanist transition-all' },
  })
  __VLS_ctx.formatCurrency(__VLS_ctx.billStore.calculateTotal())
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p
  )({
    ...{ class: __VLS_ctx.allItemsValid ? 'opacity-0' : '' },
    ...{ class: 'text-[0.7rem] text-red-500 transition-all leading-3' },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.button,
    __VLS_intrinsicElements.button
  )({
    ...{
      onClick: (...[$event]) => {
        __VLS_ctx.linkBill()
      },
    },
    disabled: !__VLS_ctx.allItemsValid,
    ...{
      class: !__VLS_ctx.allItemsValid
        ? 'text-zinc-500 bg-zinc-300 border-zinc-500 !filter-none translate-y-[3px]'
        : 'bg-secondary focus:bg-primary',
    },
    ...{
      class:
        'w-full py-2 flex flex-col items-center !ease-in-out !duration-700 justify-center button-style',
    },
  })
  __VLS_elementAsFunction(
    __VLS_intrinsicElements.h1,
    __VLS_intrinsicElements.h1
  )({ ...{ class: 'text-lg' } })
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-8']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['justify-start']
  __VLS_styleScopedClasses['pt-32']
  __VLS_styleScopedClasses['pb-48']
  __VLS_styleScopedClasses['py-4']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-4']
  __VLS_styleScopedClasses['bg-white']
  __VLS_styleScopedClasses['cartoon-border']
  __VLS_styleScopedClasses['text-left']
  __VLS_styleScopedClasses['rounded-xl']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['text-left']
  __VLS_styleScopedClasses['px-4']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['pl-3']
  __VLS_styleScopedClasses['gap-3']
  __VLS_styleScopedClasses['px-4']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['items-start']
  __VLS_styleScopedClasses['h-6']
  __VLS_styleScopedClasses['gap-2']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['text-left']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['pl-6']
  __VLS_styleScopedClasses['text-center']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['w-20']
  __VLS_styleScopedClasses['text-center']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['w-20']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-3']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['h-6']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['gap-1']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-close']
  __VLS_styleScopedClasses['text-xl']
  __VLS_styleScopedClasses['text-red-500']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['truncate']
  __VLS_styleScopedClasses['text-left']
  __VLS_styleScopedClasses['pl-1']
  __VLS_styleScopedClasses['focus:bg-grey']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['hover:outline-0']
  __VLS_styleScopedClasses['border']
  __VLS_styleScopedClasses['border-grey']
  __VLS_styleScopedClasses['h-full']
  __VLS_styleScopedClasses['rounded-md']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['text-center']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['overflow-hidden']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['w-20']
  __VLS_styleScopedClasses['h-6']
  __VLS_styleScopedClasses['border']
  __VLS_styleScopedClasses['mx-1']
  __VLS_styleScopedClasses['border-black']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['w-6']
  __VLS_styleScopedClasses['pl-1']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-minus']
  __VLS_styleScopedClasses['px-2']
  __VLS_styleScopedClasses['text-center']
  __VLS_styleScopedClasses['focus:outline-0']
  __VLS_styleScopedClasses['bg-secondary']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['h-6']
  __VLS_styleScopedClasses['rounded-full']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['w-6']
  __VLS_styleScopedClasses['pr-1']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['rounded-r-full']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-plus']
  __VLS_styleScopedClasses['w-20']
  __VLS_styleScopedClasses['h-full']
  __VLS_styleScopedClasses['hover:bg-grey']
  __VLS_styleScopedClasses['text-center']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['hover:outline-0']
  __VLS_styleScopedClasses['border']
  __VLS_styleScopedClasses['border-grey']
  __VLS_styleScopedClasses['rounded-md']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['mt-6']
  __VLS_styleScopedClasses['h-12']
  __VLS_styleScopedClasses['w-12']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['!rounded-full']
  __VLS_styleScopedClasses['bg-secondary']
  __VLS_styleScopedClasses['focus:bg-primary']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['button-style']
  __VLS_styleScopedClasses['mdi']
  __VLS_styleScopedClasses['mdi-plus']
  __VLS_styleScopedClasses['text-3xl']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['p-4']
  __VLS_styleScopedClasses['pb-0']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-8']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-2']
  __VLS_styleScopedClasses['items-start']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['text-left']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['justify-between']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['gap-2']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['relative']
  __VLS_styleScopedClasses['overflow-hidden']
  __VLS_styleScopedClasses['h-7']
  __VLS_styleScopedClasses['text-']
  __VLS_styleScopedClasses['w-10']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['pl-2']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['over']
  __VLS_styleScopedClasses['bg-grey']
  __VLS_styleScopedClasses['hover:outline-0']
  __VLS_styleScopedClasses['rounded-md']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['absolute']
  __VLS_styleScopedClasses['right-1']
  __VLS_styleScopedClasses['top-1/2']
  __VLS_styleScopedClasses['mt-[1px]']
  __VLS_styleScopedClasses['transform']
  __VLS_styleScopedClasses['-translate-y-1/2']
  __VLS_styleScopedClasses['text-xs']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['gap-4']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-row']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['gap-4']
  __VLS_styleScopedClasses['justify-between']
  __VLS_styleScopedClasses['text-2xl']
  __VLS_styleScopedClasses['font-black']
  __VLS_styleScopedClasses['shrink-0']
  __VLS_styleScopedClasses['font-urbanist']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['text-[0.7rem]']
  __VLS_styleScopedClasses['text-red-500']
  __VLS_styleScopedClasses['transition-all']
  __VLS_styleScopedClasses['leading-3']
  __VLS_styleScopedClasses['w-full']
  __VLS_styleScopedClasses['py-2']
  __VLS_styleScopedClasses['flex']
  __VLS_styleScopedClasses['flex-col']
  __VLS_styleScopedClasses['items-center']
  __VLS_styleScopedClasses['!ease-in-out']
  __VLS_styleScopedClasses['!duration-700']
  __VLS_styleScopedClasses['justify-center']
  __VLS_styleScopedClasses['button-style']
  __VLS_styleScopedClasses['text-lg']
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
      ToggleButton: ToggleButton,
      billStore: billStore,
      lastItem: lastItem,
      allItemsValid: allItemsValid,
      formatCurrency: formatCurrency,
      onPriceInput: onPriceInput,
      formatedPrice: formatedPrice,
      allowOnlyNumbers: allowOnlyNumbers,
      hasTip: hasTip,
      onTipInput: onTipInput,
      linkBill: linkBill,
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
