import { forwardRef, Module } from '@nestjs/common';
import { TabsService } from './tabs.service';
import { TabsController } from './tabs.controller';
import { OpenaiModule } from '../openai/openai.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [forwardRef(() => SessionsModule), OpenaiModule],
  controllers: [TabsController],
  providers: [TabsService],
  exports: [TabsService],
})
export class TabsModule {}
