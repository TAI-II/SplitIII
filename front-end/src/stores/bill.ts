import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/composables/useApi'
import { useSessionStore } from '@/stores/session'

export interface Item {
  id: string
  name: string
  quantity: number
  price: number
  totalPrice?: number
}

export interface AditionalCosts {
  tip: number
  couvert: number | null
}

export interface Bill {
  items: Item[]
  aditionalCosts: AditionalCosts
}

export const useBillStore = defineStore('BillStore', () => {
  const sessionStore = useSessionStore()
  const bill = ref<Bill>({
    items: [
      {
        id: '1',
        name: '',
        quantity: 0,
        price: 0,
        totalPrice: 0,
      },
    ],
    aditionalCosts: {
      tip: 0,
      couvert: null,
    },
  })
  const error = ref<string | null>(null)
  const id = ref<number>(2)

  const newItem = () => {
    bill.value.items.push({
      id: id.value + '',
      name: '',
      quantity: 0,
      price: 0,
      totalPrice: 0,
    })
    id.value++
  }

  const addItem = (item: Item) => {
    item.id = id.value + ''
    if (bill.value.items.some(i => i.name !== '')) {
      bill.value.items.push(item)
    } else {
      item.id = '1'
      bill.value.items[0] = item
    }
    id.value++
  }

  const removeItem = (index: number) => {
    if (
      index >= 0 &&
      index < bill.value.items.length &&
      bill.value.items.length > 1
    ) {
      bill.value.items.splice(index, 1)
    }
  }

  const linkBill = async () => {
    const body = {
      sessionId: sessionStore.session.id,
      tab: {
        items: bill.value.items,
        serviceFee: bill.value.aditionalCosts.tip,
        restaurantName: sessionStore.session.name,
        date: new Date(),
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
      },
    }
    try {
      const response = await apiClient.post('/tabs/link-to-session', body)
      console.log('/tabs/link-to-session', response)
    } catch (err: any) {
      error.value = err.message
    }
  }

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal()
    const tip = bill.value.aditionalCosts.tip

    return subtotal + tip
  }

  function calculateSubtotal(): number {
    const subtotal = bill.value.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    return subtotal
  }

  function setBill(newBill: any): void {
    bill.value = {
      items: newBill.items,
      aditionalCosts: {
        tip: newBill.serviceFee,
        couvert: null,
      },
    }
  }

  function setItems(items: Item[]): void {
    bill.value.items = items
  }

  return {
    bill,
    error,
    newItem,
    removeItem,
    linkBill,
    calculateTotal,
    setBill,
    setItems,
    addItem,
  }
})
