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
  province: string;

  @property({
    type: 'number',
  })
  population: number;

  @property({
    type: 'number',
  })
  firstDoses: number;

  @property({
    type: 'number',
  })
  secondDoses: number;

  @property({
    type: 'number',
  })
  received: number;

  @property({
    type: 'string',
  })
  phase1Date: string;

  @property({
    type: 'string',
  })
  phase2Date: string;

  @property({
    type: 'string',
  })
  phase3Date: string;

  constructor(data?: Partial<Vaccination>) {
    super(data);
  }
}

export interface VaccinationRelations {
  // describe navigational properties here
}

export type VaccinationWithRelations = Vaccination & VaccinationRelations;
