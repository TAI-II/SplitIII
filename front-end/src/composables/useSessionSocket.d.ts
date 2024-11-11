export declare function useSessionSocket(sessionId: string): {
    sessions: import("vue").Ref<any[], any[]>;
    usersJoined: import("vue").Ref<any[], any[]>;
    readyUsers: import("vue").Ref<any[], any[]>;
    joinSession: (userId: string) => void;
    ready: (userId: string, selectedItems: Array<{
        id: string;
        name: string;
        quantity: number;
    }>) => void;
};
