import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ApiDataSource} from '../datasources';
import {Vaccination, VaccinationRelations} from '../models/vaccination.model';

export class VaccinationRepository extends DefaultCrudRepository<
  Vaccination,
  typeof Vaccination.prototype.id,
  VaccinationRelations
> {
  constructor(@inject('datasources.Api') dataSource: ApiDataSource) {
    super(Vaccination, dataSource);
  }
}
