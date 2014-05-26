module.directive('header', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/partial/header.html',
        replace: true,
        controller : ["server", "$scope", function(server, $scope){

        }]
      };
 });
