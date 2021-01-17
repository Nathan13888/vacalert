import {Entity, model, property} from '@loopback/repository';
import {genId} from '../utils/gen-id';

@model()
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => genId(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;

  @property({
    type: 'number',
    required: true,
  })
  lng: number;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  constructor(data: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
