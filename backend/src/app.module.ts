import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiModule } from './modules/openai/openai.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/users/user.module';
import { TabsModule } from './modules/tabs/tabs.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://viniciusassis:KUm2RyLvJ9tGQOds@cluster0.6aj3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    OpenaiModule,
    SessionsModule,
    UserModule,
    TabsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
