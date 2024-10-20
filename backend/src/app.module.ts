import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './modules/openai/openai.module';
import { FilesModule } from './modules/files/files.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [OpenaiModule, FilesModule, SessionsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
