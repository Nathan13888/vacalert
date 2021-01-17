import {Entity, model, property} from '@loopback/repository';

@model()
export class BrowserSubscription extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  deviceToken: string;


  constructor(data?: Partial<BrowserSubscription>) {
    super(data);
  }
}

export interface BrowserSubscriptionRelations {
  // describe navigational properties here
}

export type BrowserSubscriptionWithRelations = BrowserSubscription & BrowserSubscriptionRelations;
