export interface Item {
    id: string;
    name: string;
    quantity: number;
    price: number;
}
export interface AditionalCosts {
    tip: number | null;
    couvert: number | null;
}
export interface Bill {
    items: Item[];
    aditionalCosts: AditionalCosts;
}
export declare const useBillStore: import("pinia").StoreDefinition<"BillStore", Pick<{
    bill: import("vue").Ref<{
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }, Bill | {
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }>;
    error: import("vue").Ref<string | null, string | null>;
    newItem: () => void;
    removeItem: (index: number) => void;
    linkBill: () => Promise<void>;
    calculateTotal: () => number;
    setBill: (newBill: any) => void;
}, "bill" | "error">, Pick<{
    bill: import("vue").Ref<{
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }, Bill | {
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }>;
    error: import("vue").Ref<string | null, string | null>;
    newItem: () => void;
    removeItem: (index: number) => void;
    linkBill: () => Promise<void>;
    calculateTotal: () => number;
    setBill: (newBill: any) => void;
}, never>, Pick<{
    bill: import("vue").Ref<{
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }, Bill | {
        items: {
            id: string;
            name: string;
            quantity: number;
            price: number;
        }[];
        aditionalCosts: {
            tip: number | null;
            couvert: number | null;
        };
    }>;
    error: import("vue").Ref<string | null, string | null>;
    newItem: () => void;
    removeItem: (index: number) => void;
    linkBill: () => Promise<void>;
    calculateTotal: () => number;
    setBill: (newBill: any) => void;
}, "newItem" | "removeItem" | "linkBill" | "calculateTotal" | "setBill">>;
