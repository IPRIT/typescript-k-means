'use strict';

/* Directives */

angular.module('Neuro.directives', [])

    .directive('viewer', function ($timeout, $interval, ApiService) {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: templateUrl('clusters', 'index'),
            controller: 'CanvasCtrl',
            link: function (scope, element, attrs) {
                $timeout(function () {
                    render();
                }, 500);

                var canvas = element.find('canvas').get(0);
                if (!canvas) {
                    return;
                }
                canvas.width = element[0].offsetWidth;
                canvas.height = element[0].offsetHeight;
                var ctx = canvas.getContext('2d');
                ctx.shadowColor = 'rgba(0,0,0,0.4)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;

                function render() {
                    var points = scope.points,
                        settings = scope.settings;
                    drawPoints(points, settings);
                }

                function drawPoints(clusters, settings) {
                    let borders = {
                        min: settings.minBoundary - settings.minDistanceBetween,
                        max: settings.maxBoundary + settings.minDistanceBetween
                    };

                    ctx.strokeStyle = "#222";
                    ctx.beginPath();
                    ctx.moveTo(borders.min, borders.min);
                    ctx.lineTo(borders.min, borders.max);
                    ctx.moveTo(borders.min, borders.max);
                    ctx.lineTo(borders.max, borders.max);
                    ctx.moveTo(borders.max, borders.max);
                    ctx.lineTo(borders.max, borders.min);
                    ctx.moveTo(borders.max, borders.min);
                    ctx.lineTo(borders.min, borders.min);
                    ctx.stroke();

                    points.forEach(function (point, clusterIndex) {
                        var rndWithSeed = new Math.seedrandom(clusterIndex + 10);
                        var r = Math.ceil(rndWithSeed() * 255);
                        var g = Math.ceil(rndWithSeed() * 255);
                        var b = Math.ceil(rndWithSeed() * 255);
                        var alpha = rndWithSeed();
                        alpha = alpha < 0.5 ? alpha + 0.5 : alpha;

                        ctx.strokeStyle = "rgba(" + r + ", " + g + ", " + b + "," + alpha + ")";
                        ctx.shadowColor = "rgba(0,0,0,0.4)";
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 1;
                        ctx.shadowBlur = 5;
                        ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + "," + Math.max(alpha - 0.2, 0.4) + ")";

                        var x = point.coords[0],
                            y = point.coords[1];
                        ctx.beginPath();
                        ctx.arc(x, y, 3, -2 * Math.PI, 2 * Math.PI, true);
                        ctx.fill();
                    });
                }

                function drawClickedPoints(points) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    render();

                    ctx.strokeStyle = "#B8890E";
                    ctx.fillStyle = "rgba(255, 191, 21, 1)";
                    ctx.shadowColor = "rgba(0,0,0,0.5)";
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 5;
                    var pointRadius = 5;

                    points.forEach(function (point) {
                        ctx.beginPath();
                        ctx.arc(point.x - pointRadius/2, point.y - pointRadius/2, pointRadius, -2 * Math.PI, 2 * Math.PI, true);
                        ctx.fill();
                    });
                }

                var canvasWithWrap = element.find('canvas');
                var updateInterval;

                window.addEventListener('resize', render);
                canvasWithWrap.on('click', function (ev) {
                    scope.clickedPoints.push({ x: ev.offsetX, y: ev.offsetY });
                    drawClickedPoints(scope.clickedPoints);
                });
            }
        }
    })
;