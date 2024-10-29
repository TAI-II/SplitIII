import { Injectable, Logger } from '@nestjs/common';
import { ITab } from './interface/tab.interface';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class TabsService {
  private readonly logger = new Logger(TabsService.name);

  constructor(
    private readonly sessionService: SessionsService,
  ) {}

  uploadImage(image: string) {
    return image;
  }

  async linkTab(sessionId: string, tab: ITab) {
    this.logger.log(`[-] Generated tab: ${JSON.stringify(tab)}`);
    this.logger.log(`[-] Patching session: ${sessionId}`);
    await this.sessionService.patch(sessionId, { tab });

    this.logger.log(`[-] Returning session: ${sessionId}`);
    return this.sessionService.findOne(sessionId);
  }
  generateMockedTab() {
    return {
      total: 100,
      serviceFee: 10,
      items: [
        { id: '1', name: 'Item 1', totalAmount: 10, pricePerUnit: 10 },
        { id: '2', name: 'Item 2', totalAmount: 20, pricePerUnit: 20 },
        { id: '3', name: 'Item 3', totalAmount: 30, pricePerUnit: 30 },
        { id: '4', name: 'Item 4', totalAmount: 40, pricePerUnit: 40 },
        { id: '5', name: 'Item 5', totalAmount: 50, pricePerUnit: 50 },
        { id: '6', name: 'Item 6', totalAmount: 60, pricePerUnit: 60 },
      ],
    };
  }
}
