import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { FilesModule } from './files/files.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [OpenaiModule, FilesModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
