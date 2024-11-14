import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from '../openai/openai.module';
import { TabsModule } from '../tabs/tabs.module';
import { UserModule } from '../users/user.module';
import { Session, SessionSchema } from './schemas/session.schema';
import { SessionsController } from './sessions.controller';
import { SessionsGateway } from './sessions.gateway';
import { SessionsService } from './sessions.service';
import { BillsModule } from '../bills/bills.module';
import { BillCalculatorService } from '../bills/bills.service';
import { SessionCode, SessionCodeSchema } from './schemas/session-code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: SessionCode.name, schema: SessionCodeSchema },
    ]),
    UserModule,
    OpenaiModule,
    TabsModule,
    BillsModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsGateway, SessionsService, BillCalculatorService],
  exports: [SessionsService],
})
export class SessionsModule {}
