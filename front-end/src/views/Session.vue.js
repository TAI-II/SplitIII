import { useBillStore } from '../stores/bill';
import { useUserStore } from '../stores/user';
import { useSessionStore } from '../stores/session';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionSocket } from '../composables/useSessionSocket';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const emit = defineEmits(['setPage']);
const billStore = useBillStore();
const userStore = useUserStore();
const sessionStore = useSessionStore();
const route = useRoute();
const sessionSocket = useSessionSocket(route.params.id);
onMounted(async () => {
    if (userStore.user) {
        await sessionSocket.joinSession(userStore.user.id);
        await sessionStore.fetchSession(route.params.id);
        console.log('user: ', userStore.user);
        console.log('bill: ', billStore.bill);
        console.log('sessionsocket: ', sessionSocket);
    }
});
const hasSelected = computed(() => {
    return userStore.calculateTotal() > 0;
});
function formatCurrency(value) {
    let formattedValue = value.toFixed(2).replace('.', ',');
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${formattedValue}`;
}
// handle price
//handle link tab
const linkBill = () => { };
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {},
});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full flex flex-col gap-4 items-center justify-start px-6 pt-24 pb-48") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("h-24 w-full flex px-4 overflow-x-auto flex-row items-center justify-between gap-4 cartoon-border bg-white text-left rounded-2xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row gap-4 items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-16 h-16 bg-secondary rounded-full cartoon-border") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col text-left") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-xl") }, });
    (__VLS_ctx.sessionStore.session.code);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.sessionStore.session.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.) }, ...{ class: ("h-12 w-12 shrink-0 !rounded-full bg-white focus:bg-primary flex flex-col items-center justify-center button-style") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("mdi mdi-share-variant-outline text-3xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("h-20 w-full flex px-6 overflow-x-auto flex-row items-center gap-4 cartoon-border drop-shadow-cartoon bg-white text-left rounded-2xl") }, });
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.sessionSocket.usersJoined.value))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-1 w-16 items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-9 h-9 bg-secondary rounded-full cartoon-border") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-[0.65rem] h-5 text-center leading-[0.65rem]") }, });
        (user.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-2 w-full flex flex-col gap-4 cartoon-border bg-secondary text-left rounded-2xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl font-black shrink-0 text-center font-urbanist transition-all") }, });
    (__VLS_ctx.formatCurrency(__VLS_ctx.billStore.calculateTotal()));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-6 w-full flex flex-col gap-4 cartoon-border drop-shadow-cartoon bg-white text-left rounded-2xl") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full text-left px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full flex flex-col gap-3 px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row text-sm items-start h-6 gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("w-full text-left font-urbanist font-black") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-center shrink-0 font-urbanist font-black w-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-center shrink-0 font-urbanist font-black w-14") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-center font-urbanist shrink-0 font-black pr-2 w-20") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.TransitionGroup;
    /** @type { [typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ name: ("fade"), tag: ("div"), ...{ class: ("flex w-full flex-col gap-3") }, }));
    const __VLS_2 = __VLS_1({ name: ("fade"), tag: ("div"), ...{ class: ("flex w-full flex-col gap-3") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    for (const [item, i] of __VLS_getVForSourceType((__VLS_ctx.userStore.user.items))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((item.id)), ...{ class: ("flex flex-row w-full h-6 items-center gap-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xs w-full") }, });
        (item.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xs w-8 text-center shrink-0") }, });
        (__VLS_ctx.billStore.bill.items[i].quantity);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xs w-14 text-right shrink-0") }, });
        (item.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center shrink-0 font-urbanist overflow-hidden flex flex-row justify-center items-center font-black w-20 h-6 border mx-1 border-black rounded-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("w-6 pl-1 shrink-0 rounded-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.userStore.user.items[i].quantity > 0
                        ? __VLS_ctx.userStore.user.items[i].quantity--
                        : 0;
                } }, ...{ class: ("mdi mdi-minus") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("number"), disabled: (true), ...{ class: ("px-2 text-center focus:outline-0 bg-secondary w-full h-6 rounded-full text-xs") }, });
        (__VLS_ctx.userStore.user.items[i].quantity);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.userStore.user.items[i].quantity <
                        __VLS_ctx.billStore.bill.items[i].quantity
                        ? __VLS_ctx.userStore.user.items[i].quantity++
                        : 0;
                } }, ...{ class: ("w-6 pr-1 shrink-0 rounded-r-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("mdi mdi-plus") }, });
    }
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full pb-0 flex flex-col gap-8 mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full flex flex-col gap-4 items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-row w-full items-center gap-4 justify-between") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-3xl text-center w-full font-black font-urbanist transition-all") }, });
    (__VLS_ctx.formatCurrency(__VLS_ctx.userStore.calculateTotal()));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.linkBill();
            } }, disabled: ((!__VLS_ctx.hasSelected)), ...{ class: ((!__VLS_ctx.hasSelected
                ? 'text-zinc-500 bg-zinc-300 border-zinc-500 !filter-none translate-y-[3px]'
                : 'bg-secondary focus:bg-primary')) }, ...{ class: ("w-full py-2 flex flex-col items-center !ease-in-out !duration-700 justify-center button-style") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-xl") }, });
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-start'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['pt-24'];
    __VLS_styleScopedClasses['pb-48'];
    __VLS_styleScopedClasses['h-24'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['overflow-x-auto'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-2xl'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['w-16'];
    __VLS_styleScopedClasses['h-16'];
    __VLS_styleScopedClasses['bg-secondary'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['h-12'];
    __VLS_styleScopedClasses['w-12'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['!rounded-full'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['focus:bg-primary'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['button-style'];
    __VLS_styleScopedClasses['mdi'];
    __VLS_styleScopedClasses['mdi-share-variant-outline'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['h-20'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['overflow-x-auto'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['drop-shadow-cartoon'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-2xl'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-1'];
    __VLS_styleScopedClasses['w-16'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['w-9'];
    __VLS_styleScopedClasses['h-9'];
    __VLS_styleScopedClasses['bg-secondary'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['text-[0.65rem]'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['leading-[0.65rem]'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['bg-secondary'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-2xl'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['py-6'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['drop-shadow-cartoon'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['rounded-2xl'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-3'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['items-start'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['w-14'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['pr-2'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-3'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['w-14'];
    __VLS_styleScopedClasses['text-right'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['w-20'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['mx-1'];
    __VLS_styleScopedClasses['border-black'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['pl-1'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['mdi'];
    __VLS_styleScopedClasses['mdi-minus'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['focus:outline-0'];
    __VLS_styleScopedClasses['bg-secondary'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['pr-1'];
    __VLS_styleScopedClasses['shrink-0'];
    __VLS_styleScopedClasses['rounded-r-full'];
    __VLS_styleScopedClasses['mdi'];
    __VLS_styleScopedClasses['mdi-plus'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['pb-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['font-black'];
    __VLS_styleScopedClasses['font-urbanist'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['!ease-in-out'];
    __VLS_styleScopedClasses['!duration-700'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['button-style'];
    __VLS_styleScopedClasses['text-xl'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            billStore: billStore,
            userStore: userStore,
            sessionStore: sessionStore,
            sessionSocket: sessionSocket,
            hasSelected: hasSelected,
            formatCurrency: formatCurrency,
            linkBill: linkBill,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
;
