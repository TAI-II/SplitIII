import { ref, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_SOCKET_URL); // Conecta ao servidor WebSocket
export function useSessionSocket(sessionId) {
    const sessions = ref([]);
    const usersJoined = ref([]);
    const readyUsers = ref([]);
    // Emite `joinSession`
    const joinSession = (userId) => {
        socket.emit('joinSession', { sessionId, userId }, (response) => {
            console.log('Join session response:', response);
            if (response.success) {
                console.log('Successfully joined session:', response.data);
            }
            else {
                console.log('Failed to join session:', response.error);
            }
        });
    };
    // Emite `ready`
    const ready = (userId, selectedItems) => {
        socket.emit('ready', { sessionId, userId, selectedItems });
    };
    // Ouve o evento `session:{sessionId}:userJoined`
    socket.on(`session:${sessionId}:userJoined`, (data) => {
        console.log('User joined:', data);
        usersJoined.value.push(data.user);
    });
    // Ouve o evento `session:${sessionId}:userReady`
    socket.on(`session:${sessionId}:userReady`, (data) => {
        console.log('User ready:', data);
        readyUsers.value.push(data.user);
    });
    onUnmounted(() => {
        socket.disconnect(); // Desconecta ao destruir o componente
    });
    return {
        sessions,
        usersJoined,
        readyUsers,
        joinSession,
        ready,
    };
}
