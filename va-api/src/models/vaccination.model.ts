import {Entity, model, property} from '@loopback/repository';
import {genId} from '../utils/gen-id';

@model()
export class Vaccination extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => genId(),
  })
  id?: string;

  @property({
    type: 'string',
  })
  province?: string;

  @property({
    type: 'number',
  })
  population?: number;

  //TODO

  constructor(data?: Partial<Vaccination>) {
    super(data);
  }
}

export interface VaccinationRelations {
  // describe navigational properties here
}

export type VaccinationWithRelations = Vaccination & VaccinationRelations;
