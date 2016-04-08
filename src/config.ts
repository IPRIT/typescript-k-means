export const CLASSES_CONF = {
  classNumber: 130,
  classDimension: 2,
  classPointsNumber: 40,
  minDistanceBetween: 40,
  radiusCompress: 3, // >= 2
  cross: true,
  minBoundary: 70,
  maxBoundary: 650
};

export const INPUT_DATA_CONF = {
  dataType: 0 //0 - generate, 1 - Iris flower data set
};

export const OUTPUT_DATA_CONF = {
  showClusters: true,
  consoleOutput: true
};

export const KMEANS_CONF = {
  centroids: 3,
  maxIterations: 100
};