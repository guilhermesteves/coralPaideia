
var isApp = typeof intel !== 'undefined';

if(isApp){
  var onDeviceReady = function(){
    intel.xdk.device.hideSplashScreen();
  };

  document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

}

var module = angular.module('coralPaideia', ['ngRoute','ui.router','ui.bootstrap','ui.mask','ui.format','angularSpinner']);


module.config(["$locationProvider","$stateProvider", "$urlRouterProvider",function($locationProvider, $stateProvider, $urlRouterProvider){

  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/');

  var authChecker = ["$rootScope","server","$state","$timeout", function($rootScope,server,$state,$timeout){
                                                      var current = $state.current.name;

                                                      if(!server.checkAuth())
                                                          $state.go("main");
                                                      else if(server.refreshing){
                                                          $rootScope.$on("auth.token.refreshed",function(){
                                                            $state.go(current);
                                                          });
                                                          $state.go("main");
                                                      }

                                                      safeDigest($rootScope);
                                                  }];

  $stateProvider
    .state('main', {
          url: "/",
          views: {
             "content": { template: "<main-page/>" },
             "headerContent": { template : "<default-header/>" }
          }
    });

}]);


function safeDigest(scope) {
    if(!scope.$$phase && !scope.$root.$$phase)
      scope.$digest();
}

