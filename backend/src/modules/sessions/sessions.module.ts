import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsGateway } from './sessions.gateway';
import { SessionsController } from './sessions.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  controllers: [SessionsController],
  providers: [SessionsGateway, SessionsService],
})
export class SessionsModule {}
