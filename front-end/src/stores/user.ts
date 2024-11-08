import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/composables/useApi'
import type { Item } from '@/composables/bill'

export interface User {
  id: string
  name: string
  admin: boolean
  items: Item[] | null
}

export const useUserStore = defineStore('UserStore', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const createUser = async (name: string) => {
    const body = {
      name: name,
    }
    try {
      const response = await apiClient.post('/users', body)
      user.value = {
        id: response.data.id,
        name: response.data.name,
        admin: false,
        items: null,
      }
      console.log('/users', response)
    } catch (err: any) {
      error.value = err.message
    }
  }

  const createAdmin = async (name: string, id: string) => {
    user.value = {
      id: id,
      name: name,
      admin: true,
      items: null,
    }
  }

  const setUserBill = (bill: Item[], empty?: boolean) => {
    const billCopy = bill.map(item => ({ ...item }))
    if (empty) billCopy.forEach(item => (item.quantity = 0))
    if (user.value) user.value.items = billCopy
  }

  function calculateTotal(): number {
    if (!user.value || user.value.items == null) return 0
    const subtotal = user.value.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    return subtotal
  }

  return {
    user,
    createUser,
    createAdmin,
    error,
    setUserBill,
    calculateTotal,
  }
})
