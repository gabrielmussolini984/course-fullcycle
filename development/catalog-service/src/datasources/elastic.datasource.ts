import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

console.log(process.env.ELASTIC_SEARCH_HOST);
const config = {
  name: 'elastic',
  connector: 'esv6',
  index: 'catalog',
  apiVersion: '7',
  version: 7,
  defaultSize: '50',
  configuration: {
    node: "http://elasticsearch:9200",
    requestTimeout: 30000,
    pingTimeout: 3000,
  },
  // mappingType: 'basedata',
  mappingProperties: {}
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ElasticDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'elastic';
  static readonly defaultConfig = config;

  constructor() {
    super(config);
  }
}
