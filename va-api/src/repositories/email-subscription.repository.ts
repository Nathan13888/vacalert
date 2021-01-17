import {DefaultCrudRepository} from '@loopback/repository';
import {EmailSubscription, EmailSubscriptionRelations} from '../models';
import {ApiDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmailSubscriptionRepository extends DefaultCrudRepository<
  EmailSubscription,
  typeof EmailSubscription.prototype.email,
  EmailSubscriptionRelations
> {
  constructor(
    @inject('datasources.Api') dataSource: ApiDataSource,
  ) {
    super(EmailSubscription, dataSource);
  }
}
