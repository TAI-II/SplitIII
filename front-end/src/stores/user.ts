import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: string
  name: string
}

export const useUserStore = defineStore('UserStore', () => {
  const user = ref<User>({
    id: '',
    name: '',
  })

  const getUserId = (): string => {
    return user.value.id
  }

  const setUserId = (id: string) => {
    user.value.id = id
  }

  const getUserName = (): string => {
    return user.value.name
  }

  const setUserName = (name: string) => {
    user.value.name = name
  }

  const createUser = (name: string) => {
    const body = {
      name: name,
    }
    const response = '1' //TODO inserir chamada da api aqui
    setUserId(response)
    setUserName(name)
  }

  const joinSession = (userId: string, sessionId: string) => {
    // TODO não esquecer de cuidar dos erros quando implementar a conexão
    const body = {
      sessionId: sessionId,
      userId: userId,
    }
    //TODO inserir chamada do evento aqui
  }

  const createAdmin = (name: string, sessionId: string) => {
    setUserId('1')
    setUserName(name)
    joinSession(getUserId(), sessionId)
  }

  return {
    getUserId,
    getUserName,
    createUser,
    createAdmin,
  }
})
