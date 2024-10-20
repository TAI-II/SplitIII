import { Injectable } from '@nestjs/common';

@Injectable()
export class TabsService {
  uploadImage(image: string) {
    return image;
  }

  linkTabToSession(sessionId: number, tabId: number) {
    return { sessionId, tabId };
  }
}
