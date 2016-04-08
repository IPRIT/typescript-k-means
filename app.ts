import {TestDataProvider, IrisDataProvider, IDataProvider, DataType} from "./src/Data/DataProvider";
import {DataMixer} from "./src/Data/DataMixer";
import {DataNormalizer} from "./src/Data/DataNormalizer";
import * as View from "./frontend/app";
import * as Config from './src/config';
import {Kmeans} from "./src/Clusterization/Kmeans";
import {EuclideanMetric} from "./src/Clusterization/Metrics/Metrics";

//noinspection TypeScriptUnresolvedFunction
let colors = require('colors/safe');
let normalizer: DataNormalizer;
let dataProvider: IDataProvider;
let kmeansClusterization: Kmeans;
let metric = new EuclideanMetric();

let [inputConfig, outputConfig] = [Config.INPUT_DATA_CONF, Config.OUTPUT_DATA_CONF];

switch (inputConfig.dataType) {
  case DataType.GENERATE:
    dataProvider = new TestDataProvider();
    break;
  case DataType.IRIS:
    dataProvider = new IrisDataProvider();
    break;
  default:
    dataProvider = new TestDataProvider();
}
dataProvider.initialize();

if (outputConfig.showClusters) {
  View.init(dataProvider.data, onAction);
}

function onAction(ev: any, callback: Function = ()=>{}) {
  let actions = {
    kmeans
  };
  if (ev && ev.type in actions) {
    actions[ev.type](ev.data, callback);
  }
}

function kmeans(params, callback) {
  if (!kmeansClusterization || params.revoke) {
    kmeansClusterization = new Kmeans(
      params.points,
      dataProvider.getInput().map(elem => { return { coords: elem } }),
      metric,
      Config.KMEANS_CONF.maxIterations
    );
  }
  callback(null, {
    groups: params.immediately ?
      kmeansClusterization.run() : kmeansClusterization.runOnce(),
    stopped: kmeansClusterization.curIteration >= kmeansClusterization.maxIterations
  });
}