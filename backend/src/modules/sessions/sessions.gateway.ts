import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';

@WebSocketGateway()
export class SessionsGateway {
  constructor(private readonly sessionsService: SessionsService) {}

  @SubscribeMessage('createSession')
  create(@MessageBody() createSessionDto: CreateSessionDto) {
    // return this.sessionsService.create(createSessionDto);
  }
}
