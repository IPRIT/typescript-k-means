import {TestDataProvider, IrisDataProvider, IDataProvider, DataType} from "src/Data/DataProvider";
import {DataMixer} from "src/Data/DataMixer";
import {DataNormalizer} from "src/Data/DataNormalizer";
import * as View from "./frontend/app";
import * as Config from './src/config';

//noinspection TypeScriptUnresolvedFunction
let colors = require('colors/safe');
let normalizer: DataNormalizer;

let [inputConfig, outputConfig] = [Config.INPUT_DATA_CONF, Config.OUTPUT_DATA_CONF];
let dataProvider: IDataProvider;

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
  console.log(params, callback);
  
}