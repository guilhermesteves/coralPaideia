
module.directive('createAccount', [ 'accountService', function(accountService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click',function(){
                accountService.create();
            });
        }
    };
}]);


module.directive('updateAccount', [ 'accountService', function(accountService) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click',function(){
        accountService.update();
      });
    }
  };
}]);

module.directive('cancelAccount', [ 'accountService', function(accountService) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click',function(){
        accountService.cancel();
      });
    }
  };
}]);
