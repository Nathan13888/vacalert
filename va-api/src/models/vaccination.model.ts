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
    scale: 0,
    postgresql: {
      dataType: 'integer',
    },
  })
  population: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  firstDoses: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  secondDoses: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  received: number;

  constructor(data?: Partial<Vaccination>) {
    super(data);
  }
}

export interface VaccinationRelations {
  // describe navigational properties here
}

export type VaccinationWithRelations = Vaccination & VaccinationRelations;
