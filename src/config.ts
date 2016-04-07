export const CLASSES_CONF = {
  classNumber: 5,
  classDimension: 2,
  classPointsNumber: 100,
  minDistanceBetween: 100,
  radiusCompress: 2, // >= 2
  cross: false,
  minBoundary: 300,
  maxBoundary: 600
};

export const INPUT_DATA_CONF = {
  dataType: 0 //0 - generate, 1 - Iris flower data set
};

export const OUTPUT_DATA_CONF = {
  showClusters: true,
  consoleOutput: true
};

export const KMEANS_CONF = {
  //todo(me): add some settings
  centroids: 3,
  maxIterations: 10000
};