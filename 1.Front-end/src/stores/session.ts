import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/composables/useApi'
import { useBillStore } from '@/stores/bill'
import { useUserStore } from '@/stores/user'
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
  const billStore = useBillStore()
  const userStore = useUserStore()
  const status = ref<'progress' | 'result' | 'success'>('progress')
  const usersJoined = ref<any[]>([])
  const readyUsers = ref<any[]>([])

  const createSession = async (name: string, userName: string) => {
    const body = {
      name: name,
      userName: userName,
    }
    try {
      const response = await apiClient.post('/sessions', body)
      console.log('/sessions', response)
      session.value = {
        id: response.data._id,
        creatorId: response.data.creatorId,
        createdAt: response.data.createdAt,
        code: response.data.code,
        name: response.data.name,
      }
    } catch (err: any) {
      console.log(err)
      error.value = err.message
    }
  }

  const fetchSession = async (id: string) => {
    try {
      const response = await apiClient.get(`/sessions/code/${id}`)
      session.value = {
        id: response.data._id,
        creatorId: response.data.creatorId,
        createdAt: response.data.createdAt,
        code: response.data.code,
        name: response.data.name,
      }
      console.log('fetched session: ', response.data)
      billStore.setBill(response.data.tab)
      userStore.setUserBill(response.data.tab.items, true)
      return true
    } catch (err: any) {
      console.log(err)
      return false
    }
  }

  return {
    session,
    error,
    createSession,
    fetchSession,
    usersJoined,
    readyUsers,
    status,
  }
})
