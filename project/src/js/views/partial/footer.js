module.directive('footer', function() {
      return {
        restrict: 'E',
        templateUrl: 'view/partial/footer.html',
        replace: true,
        controller : ["server", "$scope", function(server, $scope){

          $scope.menuAutor = function () {
            $scope.isSubmenu = true;
          };

          $scope.menuPrincipal = function () {
            $scope.isSubmenu = false;
          };
        }]
      };
 });
