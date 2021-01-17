import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Api',
  connector: 'postgresql',
  url: 'postgres://va:password@192.168.10.69:26250/va',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ApiDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Api';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Api', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
