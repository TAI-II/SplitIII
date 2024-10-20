import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from '../openai/openai.module';
import { TabsModule } from '../tabs/tabs.module';
import { UserModule } from '../users/user.module';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionsController } from './sessions.controller';
import { SessionsGateway } from './sessions.gateway';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    UserModule,
    OpenaiModule,
    TabsModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsGateway, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
