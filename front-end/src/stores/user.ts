import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/composables/useApi'

export interface User {
  id: string
  name: string
  admin: boolean
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
        id: response.data._id,
        name: response.data.name,
        admin: false,
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
    }
  }

  const joinSession = async (userId: string, sessionId: string) => {
    // TODO não esquecer de cuidar dos erros quando implementar a conexão
    const body = {
      sessionId: sessionId,
      userId: userId,
    }

    //TODO inserir chamada do evento aqui
  }

  return {
    createUser,
    createAdmin,
    error,
  }
})
