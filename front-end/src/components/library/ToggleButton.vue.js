import { defineProps, defineEmits } from 'vue';
const { defineSlots, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emit = defineEmits();
const toggle = () => {
    emit('update:modelValue', !props.modelValue);
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggle) }, ...{ class: ("w-10 h-6 flex items-center rounded-full cursor-pointer cartoon-border transition-all duration-300") }, ...{ class: ((__VLS_ctx.modelValue ? 'bg-secondary' : 'bg-grey')) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white w-6 h-6 rounded-full flex items-center justify-center cartoon-border shadow-md transform transition-transform duration-300") }, ...{ class: ((__VLS_ctx.modelValue ? 'translate-x-4' : '-translate-x-1')) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-grey w-[10px] h-[10px] rounded-full flex items-center justify-center cartoon-border shadow-md transform transition-transform duration-300") }, });
    __VLS_styleScopedClasses['w-10'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-grey'];
    __VLS_styleScopedClasses['w-[10px]'];
    __VLS_styleScopedClasses['h-[10px]'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['cartoon-border'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
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
            toggle: toggle,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
;
