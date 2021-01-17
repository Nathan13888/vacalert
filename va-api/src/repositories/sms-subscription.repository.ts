import {DefaultCrudRepository} from '@loopback/repository';
import {SmsSubscription, SmsSubscriptionRelations} from '../models';
import {ApiDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SmsSubscriptionRepository extends DefaultCrudRepository<
  SmsSubscription,
  typeof SmsSubscription.prototype.phoneNumber,
  SmsSubscriptionRelations
> {
  constructor(
    @inject('datasources.Api') dataSource: ApiDataSource,
  ) {
    super(SmsSubscription, dataSource);
  }
}
