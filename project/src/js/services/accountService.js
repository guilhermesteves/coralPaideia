module.factory('accountService',['$rootScope','server', function (rootScope, server){
    var service = {

       account : {gender : {id : 0, desc : "Masculino"}},
       myAccount : {},
       serverMyAccount : {},
       genders: [{id : 0, desc : "Masculino"},{id : 1, desc : "Feminino"}],

       load : function(){
           server.get("/myAccount/").success(function(data){
               service.serverMyAccount = service.myAccount = angular.copy(data);
               rootScope.$broadcast("my.account.loaded");
           });
       },

       create : function(){
           server.post("/account/",this.account).success(function(){
               server.ajaxLogin(service.account.user.email,service.account.user.password);
               service.account = {gender : {id : 0, desc : "Masculino"}};
               rootScope.$broadcast("account.created");
           });

           safeDigest(rootScope);
       },

        update : function(){
          server.put("/account/",this.myAccount).success(function(){
            rootScope.$broadcast("my.account.updated");
          });

          safeDigest(rootScope);
        },

        cancel : function(){
          this.myAccount = this.serverMyAccount;
          rootScope.$broadcast("my.account.cancelled");
        }

    };

    return service;

}]);



