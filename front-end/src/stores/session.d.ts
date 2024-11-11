export interface Session {
    id: string;
    creatorId: string;
    createdAt: string;
    code: string;
    name: string;
}
export declare const useSessionStore: import("pinia").StoreDefinition<"SessionStore", Pick<{
    session: import("vue").Ref<{
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null, Session | {
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null>;
    error: import("vue").Ref<string | null, string | null>;
    createSession: (name: string, userName: string) => Promise<void>;
    fetchSession: (id: string) => Promise<void>;
}, "error" | "session">, Pick<{
    session: import("vue").Ref<{
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null, Session | {
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null>;
    error: import("vue").Ref<string | null, string | null>;
    createSession: (name: string, userName: string) => Promise<void>;
    fetchSession: (id: string) => Promise<void>;
}, never>, Pick<{
    session: import("vue").Ref<{
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null, Session | {
        id: string;
        creatorId: string;
        createdAt: string;
        code: string;
        name: string;
    } | null>;
    error: import("vue").Ref<string | null, string | null>;
    createSession: (name: string, userName: string) => Promise<void>;
    fetchSession: (id: string) => Promise<void>;
}, "createSession" | "fetchSession">>;
