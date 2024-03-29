import {Model, model, property} from '@loopback/repository';

@model()
export class ProfileResult extends Model {
  @property({
    type: 'number',
    required: true,
  })
  phase: number;

  @property({
    type: 'string',
  })
  fromDate: string;

  @property({
    type: 'string',
  })
  toDate?: string;

  constructor(data?: Partial<ProfileResult>) {
    super(data);
  }
}

export interface ProfileResultRelations {
  // describe navigational properties here
}

export type ProfileResultWithRelations = ProfileResult & ProfileResultRelations;
