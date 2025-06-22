import { Injectable, Logger } from '@nestjs/common';
import { ITab } from '../tabs/interface/tab.interface';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async generateTab(imageUrl: string): Promise<ITab> {
    this.logger.log(`[-] Generating tab from image buffer`);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Please analyze this image of a restaurant tab and convert it into a JSON format with the following structure: { total: number, serviceFee: number, items: [{ id: string, name: string, totalAmount: number, pricePerUnit: number }] }. Ensure all numerical values are parsed as numbers, not strings." },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 1000,
      });

      const jsonString = response.choices[0].message.content;
      const tab: ITab = JSON.parse(jsonString);
      
      this.logger.log(`[-] Generated tab: ${JSON.stringify(tab)}`);
      return tab;
    } catch (error) {
      this.logger.error(`Error generating tab: ${error.message}`);
      throw new Error('Failed to generate tab from image');
    }
  }
}
