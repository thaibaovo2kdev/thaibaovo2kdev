import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RmqService {
  private client: ClientProxy;


  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'instagram_post_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }


  getClient(): ClientProxy {
    return this.client;
  }
}
