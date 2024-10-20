import { Injectable, Logger } from '@nestjs/common';
import { ITab } from '../tabs/interface/tab.interface';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  async generateTab(imageUrl: string): Promise<ITab> {
    this.logger.log(`[-] Generating tab from image: ${imageUrl}`);
    return {
      total: 100,
      serviceFee: 10,
      items: [
        {
          id: '1',
          name: 'Cerveja',
          totalAmount: 3,
          pricePerUnit: 7.0,
        },
        {
          id: '2',
          name: 'Refrigerante',
          totalAmount: 5,
          pricePerUnit: 5.0,
        },
        {
          id: '3',
          name: 'Porção de Batata Frita',
          totalAmount: 1,
          pricePerUnit: 18.0,
        },
      ],
    };
  }
}
