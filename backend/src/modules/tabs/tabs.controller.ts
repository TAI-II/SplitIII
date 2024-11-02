import { Body, Controller, Logger, Param, Patch, Post } from '@nestjs/common';
import { TabsService } from './tabs.service';
import { ProcessTabDto } from '../sessions/dto/process-tab.dto';
import { SessionsService } from '../sessions/sessions.service';
import { OpenaiService } from '../openai/openai.service';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ITab } from './interface/tab.interface';
import { LinkTabToSessionDto } from './link-tab.dto';

@Controller('tabs')
@ApiTags('tabs')
export class TabsController {
  private readonly logger = new Logger(TabsController.name);
  constructor(
    private readonly tabsService: TabsService,
    private readonly sessionService: SessionsService,
    private readonly openaiService: OpenaiService,
  ) {}

  @Post('/process')
  @ApiBody({
    type: ProcessTabDto,
    examples: {
      a: { value: { image: 'https://example.com/image.png', sessionId: 1 } },
    },
  })
  @ApiOperation({
    summary:
      'Processa uma tab, pega a imagem, faz upload, transcreve pra json e salva na sessão',
  })
  @ApiResponse({
    status: 201,
    description: 'The tab has been successfully processed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async processTab(@Body() processTabDto: ProcessTabDto) {
    this.logger.log(`[-] Processing tab: ${JSON.stringify(processTabDto)}`);
    try {
      this.logger.log(`[-] Uploading image: ${processTabDto.image}`);
      const imageUrl = await this.tabsService.uploadImage(processTabDto.image);

      this.logger.log(`[-] Generating tab: ${imageUrl}`);
      const tab = await this.openaiService.generateTab(imageUrl);

      this.tabsService.linkTab(processTabDto.sessionId, tab);
    } catch (error) {
      this.logger.error(`[-] Error processing tab: ${error}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error processing tab');
    }
  }

  @Post('/link-to-session')
  @ApiBody({
    type: LinkTabToSessionDto,
  })
  async linkTabToSession(@Body() linkTabToSessionDto: LinkTabToSessionDto) {
    return this.tabsService.linkTab(
      linkTabToSessionDto.sessionId,
      linkTabToSessionDto.tab,
    );
  }
}
