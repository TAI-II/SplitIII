import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class SessionsGateway {
  constructor() {}

  @SubscribeMessage('createSession')
  create() {}
}
