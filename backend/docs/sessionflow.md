# Guia de Fluxo de Sessão PaySplit

Este guia demonstra o fluxo completo de uma sessão PaySplit, desde a criação até o cálculo da conta.

## Índice

- [Guia de Fluxo de Sessão PaySplit](#guia-de-fluxo-de-sessão-paysplit)
  - [Índice](#índice)
  - [1. Criar Sessão](#1-criar-sessão)
  - [2. Vincular Conta](#2-vincular-conta)
  - [3. Configurar Conexão WebSocket](#3-configurar-conexão-websocket)
  - [4. Entrada do Administrador](#4-entrada-do-administrador)
  - [5. Entrada do Amigo](#5-entrada-do-amigo)
  - [6. Selecionar Itens](#6-selecionar-itens)
  - [7. Calcular Conta](#7-calcular-conta)
  - [Observações](#observações)

## 1. Criar Sessão

O administrador cria uma nova sessão via requisição HTTP POST:

```js
const createSessionResponse = await fetch('/sessions', {
  method: 'POST',
  body: JSON.stringify({
    name: "Friday's Dinner",
    userName: 'John Doe', // Isso criará um usuário e o definirá como criador
  }),
});
const session = await createSessionResponse.json();
```

## 2. Vincular Conta

O administrador vincula a conta do restaurante à sessão:

```js
const linkTabResponse = await fetch('/tabs/link-to-session', {
  method: 'POST',
  body: JSON.stringify({
    sessionId: session.id,
    tab: {
      items: [
        { id: '1', name: 'Pizza', pricePerUnit: 50 },
        { id: '2', name: 'Beer', pricePerUnit: 10 },
        { id: '3', name: 'Fries', pricePerUnit: 15 },
      ],
      serviceFee: 10,
      restaurantName: "Joe's Pizza",
      date: new Date(),
      subtotal: 75,
      total: 85,
    },
  }),
});
```

## 3. Configurar Conexão WebSocket

Ambos os usuários precisam estabelecer uma conexão WebSocket:

```js
const socket = io('ws://your-server'); // Usando socket.io-client
```

## 4. Entrada do Administrador

O administrador entra na sessão que criou:

```js
// Admin joins their session
socket.emit('joinSession', {
  sessionId: session.id,
  userId: session.creatorId
});
// Listen for join confirmation
socket.on(`session:${session._id}:userJoined`, (data) => {
  console.log('User joined:', data);
});
```

## 5. Entrada do Amigo

O amigo cria uma conta e entra na sessão:

```js
// Create user account for friend
const createUserResponse = await fetch('/users', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Jane Smith',
  }),
});
const friend = await createUserResponse.json();
// Friend joins session using session code
socket.emit('joinSession', {
  sessionId: session.id,
  userId: friend.id,
});
```

## 6. Selecionar Itens

Ambos os usuários selecionam seus itens e marcam como prontos:

```js
// Admin selects items
socket.emit('ready', {
  sessionId: session.id,
  userId: session.creatorId,
  selectedItems: [
    { id: '1', name: 'Pizza', quantity: 1 },
    { id: '2', name: 'Beer', quantity: 2 },
  ],
});
// Friend selects items
socket.emit('ready', {
  sessionId: session.id,
  userId: friend.id,
  selectedItems: [
    { id: '1', name: 'Pizza', quantity: 1 },
    { id: '3', name: 'Fries', quantity: 1 },
  ],
});
```

## 7. Calcular Conta

Verificar se todos os usuários estão prontos e receber o cálculo da conta:

```js
socket.emit('checkAllUsersReady', {
  sessionId: session.id
});
// Listen for bill calculation
socket.on(`session:${session._id}:billCalculated`, (result) => {
  if (result.success) {
    const billCalculation = result.data;
    console.log('Bill split result:', billCalculation);
    /* Example output:
    {
      users: [
        {
          userId: "admin_id",
          userName: "John Doe",
          items: [
            { id: '1', name: 'Pizza', quantity: 1, unitPrice: 50, totalPrice: 25 },
            { id: '2', name: 'Beer', quantity: 2, unitPrice: 10, totalPrice: 20 }
          ],
          subtotal: 45,
          serviceFeeShare: 5,
          total: 50
        },
        {
          userId: "friend_id",
          userName: "Jane Smith",
          items: [
            { id: '1', name: 'Pizza', quantity: 1, unitPrice: 50, totalPrice: 25 },
            { id: '3', name: 'Fries', quantity: 1, unitPrice: 15, totalPrice: 15 }
          ],
          subtotal: 40,
          serviceFeeShare: 5,
          total: 45
        }
      ],
      sessionTotal: 85,
      serviceFeePaid: 10,
      grandTotal: 95
    }
    */
  }
});
```

## Observações
- Todos os eventos WebSocket emitem atualizações em tempo real para todos os usuários conectados
- As taxas de serviço são divididas igualmente entre todos os participantes
- Os itens são divididos com base nas seleções individuais
- A sessão permanece ativa até ser explicitamente fechada
- Todos os valores monetários estão na mesma unidade de moeda