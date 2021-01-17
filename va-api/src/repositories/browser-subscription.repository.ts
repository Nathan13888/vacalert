import {DefaultCrudRepository} from '@loopback/repository';
import {BrowserSubscription, BrowserSubscriptionRelations} from '../models';
import {ApiDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BrowserSubscriptionRepository extends DefaultCrudRepository<
  BrowserSubscription,
  typeof BrowserSubscription.prototype.deviceToken,
  BrowserSubscriptionRelations
> {
  constructor(
    @inject('datasources.Api') dataSource: ApiDataSource,
  ) {
    super(BrowserSubscription, dataSource);
  }
}
