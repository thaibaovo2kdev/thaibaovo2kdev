import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AnalyticsEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  emitAnalyticsUpdate(accountId: number, platform: string, data: any) {
    this.eventEmitter.emit('analytics.update', { accountId, platform, data });
  }
}