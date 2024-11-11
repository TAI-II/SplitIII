import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../composables/useApi'
import { useSessionStore } from '../stores/session'
export const useBillStore = defineStore('BillStore', () => {
  const sessionStore = useSessionStore()
  const bill = ref({
    items: [
      {
        id: '1',
        name: '',
        quantity: 0,
        price: 0,
      },
    ],
    aditionalCosts: {
      tip: null,
      couvert: null,
    },
  })
  const error = ref(null)
  const id = ref(2)
  const newItem = () => {
    bill.value.items.push({
      id: id.value + '',
      name: '',
      quantity: 0,
      price: 0,
    })
    id.value++
  }
  const removeItem = index => {
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
    } catch (err) {
      error.value = err.message
    }
  }
  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tip = bill.value.aditionalCosts.tip
      ? (bill.value.aditionalCosts.tip / 100) * subtotal
      : 0
    return subtotal + tip
  }
  function calculateSubtotal() {
    const subtotal = bill.value.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    return subtotal
  }
  function setBill(newBill) {
    bill.value = {
      items: newBill.items,
      aditionalCosts: {
        tip: newBill.serviceFee,
        couvert: null,
      },
    }
  }
  return {
    bill,
    error,
    newItem,
    removeItem,
    linkBill,
    calculateTotal,
    setBill,
  }
})
