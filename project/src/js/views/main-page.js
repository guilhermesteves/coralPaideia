 module.directive('mainPage', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/main-page.html',
        replace: true,
        controller : ["$scope", "musicService",  function($scope, musicService){

          $scope.getMusics = musicService.getMusics;
        }]
      };
 });
