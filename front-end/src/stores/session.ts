import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { ref } from 'vue'

export interface Session {
  id: string
}

export const useSessionStore = defineStore('SessionStore', () => {
  const userStore = useUserStore()
  const session = ref<Session>({
    id: '',
  })

  const getSessionId = (): string => {
    return session.value.id
  }

  const setSessionId = (id: string) => {
    session.value.id = id
  }

  const createSession = (name: string, userName: string) => {
    const body = {
      name: name,
      userName: userName,
    }
    const response = '1234' //TODO inserir chamada da api aqui
    setSessionId(response)
    userStore.createAdmin(name, getSessionId())
  }

  return {
    getSessionId,
    createSession,
  }
})
