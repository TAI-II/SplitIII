import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../composables/useApi'
export const useUserStore = defineStore('UserStore', () => {
  const user = ref(null)
  const error = ref(null)
  const createUser = async name => {
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
    } catch (err) {
      error.value = err.message
    }
  }
  const createAdmin = async (name, id) => {
    user.value = {
      id: id,
      name: name,
      admin: true,
      items: null,
    }
  }
  const setUserBill = (bill, empty) => {
    const billCopy = bill.map(item => ({ ...item }))
    if (empty) billCopy.forEach(item => (item.quantity = 0))
    if (user.value) user.value.items = billCopy
  }
  function calculateTotal() {
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
