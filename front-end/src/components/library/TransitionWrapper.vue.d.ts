export type AnimationType = 'bounce' | 'fade' | 'slide-in-bottom-fade-out' | 'slide-in-bottom-out-none' | 'slide-in-bottom' | 'slide-in-left' | 'slide-in-left-out-right' | 'slide-in-right' | 'slide-in-right-out-left' | 'slide-in-top' | 'fade-from-top' | 'expand';
interface Props {
    name: AnimationType;
    mode?: 'default' | 'out-in' | 'in-out';
}
declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    attrs: Partial<{}>;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    mode: "default" | "out-in" | "in-out";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
