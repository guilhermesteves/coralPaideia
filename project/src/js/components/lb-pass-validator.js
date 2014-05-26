module.directive('lbPassValidator', ['$parse',function($parse) {
    return {
      priority : 8,
      require : "ngModel",
      restrict: 'A',
      scope : false,
      compile:  function (element, attrs, transclude) {
        
        return function(scope,element,attrs,ngModelCtrl){
            ngModelCtrl.$parsers.push(function(value){
              var valid = (value === $parse(attrs.lbPassValidator)(scope));
              
              ngModelCtrl.$setValidity('password', valid);

              return value;
            });

        };

         
      }
    };
  }]);
