import { ref, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useSessionStore } from '@/stores/session'

const socket: Socket = io(import.meta.env.VITE_SOCKET_URL) // Conecta ao servidor WebSocket

export function useSessionSocket() {
  const sessionStore = useSessionStore()
  const sessions = ref<any[]>([])

  // Emite `joinSession`
  const joinSession = (userId: string) => {
    const sessionId = sessionStore.session.id
    socket.emit('joinSession', { sessionId, userId }, (response: any) => {
      console.log('Join session response:', response)
      if (response.success) {
        sessionStore.usersJoined = response.data
        startListeners()
        console.log('Successfully joined session:', response.data)
      } else {
        console.log('Failed to join session:', response.error)
      }
    })
  }

  // Emite `ready`
  const ready = (
    userId: string,
    selectedItems: Array<{ id: string; name: string; quantity: number }>
  ) => {
    const sessionId = sessionStore.session.id
    console.log('aquiiiiii', userId, selectedItems)
    console.log('sessionId', sessionId)
    socket.emit(
      'ready',
      { sessionId, userId, selectedItems },
      (response: any) => {
        console.log('Ready response:', response)
      }
    )
  }

  const startListeners = () => {
    const sessionId = sessionStore.session.id
    socket.on(`session:${sessionId}:userJoined`, (data: any) => {
      console.log('User joined:', data)
      sessionStore.usersJoined.push(data.user)
    })

    socket.on(`session:${sessionId}:readyUpdate`, (data: any) => {
      console.log('Ready Update:', data)
      if (data.readyUsers == data.totalUsers) sessionStore.status = 'result'
      sessionStore.readyUsers.push(data)
    })
  }

  onUnmounted(() => {
    socket.disconnect() // Desconecta ao destruir o componente
  })

  return {
    sessions,
    joinSession,
    ready,
  }
}
