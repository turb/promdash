angular.module("Prometheus.controllers").controller('EmbedCtrl',["$scope", "$window", "$timeout", "URLConfigEncoder", "FullScreenAspectRatio", "SharedGraphBehavior", function($scope, $window, $timeout, URLConfigEncoder, FullScreenAspectRatio, SharedGraphBehavior) {
  $window.onresize = function() {
    $scope.$apply(function() {
      // Need to $apply to propagate aspectRatio change,
      // and then redraw on the next event loop to have accurate aspectRatio
      $scope.globalConfig.aspectRatio = FullScreenAspectRatio();
      $timeout(function() {
        $scope.$broadcast('redrawGraphs');
      });
    });
  };

  SharedGraphBehavior($scope, dashboardData.globalConfig);

  $scope.globalConfig.aspectRatio = FullScreenAspectRatio();
  $scope.widgets = dashboardData.widgets || [];

  $scope.widgetClass = function(i) {
    if ($scope.activeWidget === i) {
      return 'active_widget';
    } else {
      return 'inactive_widget';
    }
  };

  $scope.incrementActive = function(by) {
    $scope.activeWidget = ($scope.widgets.length + $scope.activeWidget + by) % $scope.widgets.length;
    $scope.nextCycleRedraw();
  };

  $scope.activeWidget = 0;

  $scope.$on('removeWidget', function(ev, index) {
    $scope.widgets.splice(index, 1);
  });
}]);
