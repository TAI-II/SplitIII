import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/composables/useApi'

export interface Session {
  id: string
  creatorId: string
  createdAt: string
  code: string
  name: string
}

export const useSessionStore = defineStore('SessionStore', () => {
  const session = ref<Session | null>(null)
  const error = ref<string | null>(null)

  const createSession = async (name: string, userName: string) => {
    const body = {
      name: name,
      userName: userName,
    }
    try {
      const response = await apiClient.post('/sessions', body)
      console.log('/sessions', response)
      session.value = {
        id: response.data.data._id,
        creatorId: response.data.data.creatorId,
        createdAt: response.data.data.createdAt,
        code: response.data.data.code,
        name: response.data.data.name,
      }
    } catch (err: any) {
      error.value = err.message
    }
  }

  return {
    session,
    error,
    createSession,
  }
})
