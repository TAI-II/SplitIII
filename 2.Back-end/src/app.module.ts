import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from './modules/openai/openai.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/users/user.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BillsModule } from './modules/bills/bills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    OpenaiModule,
    SessionsModule,
    UserModule,
    TabsModule,
    BillsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
