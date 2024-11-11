import type { Item } from '../composables/bill'
export interface User {
  id: string
  name: string
  admin: boolean
  items: Item[] | null
}
export declare const useUserStore: import('pinia').StoreDefinition<
  'UserStore',
  Pick<
    {
      user: import('vue').Ref<
        {
          id: string
          name: string
          admin: boolean
          items: any
        } | null,
        | User
        | {
            id: string
            name: string
            admin: boolean
            items: any
          }
        | null
      >
      createUser: (name: string) => Promise<void>
      createAdmin: (name: string, id: string) => Promise<void>
      error: import('vue').Ref<string | null, string | null>
      setUserBill: (bill: Item[], empty?: boolean) => void
      calculateTotal: () => number
    },
    'error' | 'user'
  >,
  Pick<
    {
      user: import('vue').Ref<
        {
          id: string
          name: string
          admin: boolean
          items: any
        } | null,
        | User
        | {
            id: string
            name: string
            admin: boolean
            items: any
          }
        | null
      >
      createUser: (name: string) => Promise<void>
      createAdmin: (name: string, id: string) => Promise<void>
      error: import('vue').Ref<string | null, string | null>
      setUserBill: (bill: Item[], empty?: boolean) => void
      calculateTotal: () => number
    },
    never
  >,
  Pick<
    {
      user: import('vue').Ref<
        {
          id: string
          name: string
          admin: boolean
          items: any
        } | null,
        | User
        | {
            id: string
            name: string
            admin: boolean
            items: any
          }
        | null
      >
      createUser: (name: string) => Promise<void>
      createAdmin: (name: string, id: string) => Promise<void>
      error: import('vue').Ref<string | null, string | null>
      setUserBill: (bill: Item[], empty?: boolean) => void
      calculateTotal: () => number
    },
    'calculateTotal' | 'createUser' | 'createAdmin' | 'setUserBill'
  >
>
