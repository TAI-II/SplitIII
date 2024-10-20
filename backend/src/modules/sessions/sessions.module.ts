import { forwardRef, Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsGateway } from './sessions.gateway';
import { SessionsController } from './sessions.controller';
import { UserModule } from '../users/user.module';
import { TabsModule } from '../tabs/tabs.module';
import { OpenaiModule } from '../openai/openai.module';
import { Session, SessionSchema } from './schemas/session.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]), UserModule, OpenaiModule, TabsModule],
  controllers: [SessionsController],
  providers: [SessionsGateway, SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
