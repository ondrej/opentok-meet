var Firebase = require("firebase");

angular.module('opentok-meet').directive('publishErrors', function () {
  return {
    restrict: 'E',
    template: '<div id="publishError" class="statusMessage" ng-if="publishError">' +
    'Publish Failed {{publishError}}</div>',
    controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.$on('otPublisherError', function(event, err, publisher) {
        handlePublisherError($scope, event, err);
      });
      $rootScope.$on('otPublisherError', function(event, err, publisher) {
        handlePublisherError($scope, event, err);
      });
      $scope.$on('otSubscriberError', function(event, err, subscriber) {
        handlePublisherError($scope, event, err);
      });
      $rootScope.$on('otSubscriberError', function(event, err, subscriber) {
        handlePublisherError($scope, event, err);
      });
    }]
  };
});

function handlePublisherError($scope, event, err) {
  $scope.publishError = err.message;
  $scope.mouseMove = true;
  $scope.togglePublish();
  $scope.$apply();

  var fb;
  var room = window.location.pathname.split('/').slice(-1)[0];
  if (room.endsWith('p2p')) {
    room = room.substring(0, room.length - 3);
    fb = new Firebase('https://cdlwebshops.firebaseio.com/focuscon/partnerships/' + room + '/p2pFailed');
  } else {
    fb = new Firebase('https://cdlwebshops.firebaseio.com/focuscon/partnerships/' + room + '/routedFailed');
  }

  fb.set(1);
}