import {Entity, model, property} from '@loopback/repository';

@model()
export class EmailSubscription extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  userId: string;

  constructor(data?: Partial<EmailSubscription>) {
    super(data);
  }
}

export interface EmailSubscriptionRelations {
  // describe navigational properties here
}

export type EmailSubscriptionWithRelations = EmailSubscription &
  EmailSubscriptionRelations;
