import {Entity, model, property} from '@loopback/repository';
import {genId} from '../utils/gen-id';

@model()
export class UserProfile extends Entity {
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
  province: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'boolean',
  })
  homeCare?: boolean;

  @property({
    type: 'boolean',
  })
  healthCare?: boolean;

  @property({
    type: 'boolean',
  })
  frontline?: boolean;

  @property({
    type: 'boolean',
  })
  indigenous?: boolean;

  @property({
    type: 'boolean',
  })
  congregated?: boolean;

  @property({
    type: 'boolean',
  })
  essential?: boolean;

  @property({
    type: 'boolean',
  })
  pregnant?: boolean;

  @property({
    type: 'string',
  })
  email?: string;

  constructor(data?: Partial<UserProfile>) {
    super(data);
  }
}

export interface UserProfileRelations {
  // describe navigational properties here
}

export type UserProfileWithRelations = UserProfile & UserProfileRelations;
