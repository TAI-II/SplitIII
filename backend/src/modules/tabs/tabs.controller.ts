import { Body, Controller, Logger, Post } from '@nestjs/common';
import { TabsService } from './tabs.service';
import { ProcessTabDto } from '../sessions/dto/process-tab.dto';
import { SessionsService } from '../sessions/sessions.service';
import { OpenaiService } from '../openai/openai.service';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

@Controller('tabs')
export class TabsController {
  private readonly logger = new Logger(TabsController.name);
  constructor(
    private readonly tabsService: TabsService,
    private readonly sessionService: SessionsService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Post('/process')
  async processTab(@Body() processTabDto: ProcessTabDto) {
    this.logger.log(`[-] Processing tab: ${JSON.stringify(processTabDto)}`);
    try {
      this.logger.log(`[-] Uploading image: ${processTabDto.image}`);
      const imageUrl = await this.tabsService.uploadImage(processTabDto.image);

      this.logger.log(`[-] Generating tab: ${imageUrl}`);
      const tab = await this.openaiService.generateTab(imageUrl);

      this.logger.log(`[-] Generated tab: ${JSON.stringify(tab)}`);
      this.logger.log(`[-] Patching session: ${processTabDto.sessionId}`);
      await this.sessionService.patch(processTabDto.sessionId, { tab });

      this.logger.log(`[-] Returning session: ${processTabDto.sessionId}`);
      return this.sessionService.findOne(processTabDto.sessionId);
    } catch (error) {
      this.logger.error(`[-] Error processing tab: ${error}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error processing tab');
    }
  }
}
