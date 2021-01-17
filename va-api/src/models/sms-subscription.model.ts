import {Entity, model, property} from '@loopback/repository';

@model()
export class SmsSubscription extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
  })
  userId: string;

  constructor(data?: Partial<SmsSubscription>) {
    super(data);
  }
}

export interface SmsSubscriptionRelations {
  // describe navigational properties here
}

export type SmsSubscriptionWithRelations = SmsSubscription &
  SmsSubscriptionRelations;
