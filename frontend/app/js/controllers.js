'use strict';

/* Controllers */

angular.module('Neuro.controllers', [])
    .controller('PageCtrl', ['$scope', function($scope) {
        console.log(1);
    }])

    .controller('AppCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        console.log(2);
    }])

    .controller('IndexCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
        console.log(3);
    }])

    .controller('CanvasCtrl', ['$scope', 'ApiService', function ($scope, ApiService) {
        console.log('Works');
        $scope.clusters = [];
        $scope.points = [];
        $scope.clickedPoints = [];
        
        ApiService.getClusters().then(function (data) {
            console.log('Clusters:', data);
            $scope.clusters = data;
        });

        ApiService.getPoints().then(function (data) {
            console.log('Points:', data);
            $scope.points = data;
        });
        
        ApiService.getSettings().then(function (data) {
            console.log('Settings:', data);
            $scope.settings = data;
        });
    }])
;