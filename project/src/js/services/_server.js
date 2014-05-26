
module.factory('server',['$rootScope','$state','$http','$timeout','storage','loading', 'alert', function ($rootScope, state, $http, $timeout, storage, loading, alert){


  var service = {
        urlBase : "http://localhost:3000",
        clientId :  !isApp ? "webClientHTML" :"appClientHTML",
        clientSecret : !isApp ? "" : "",
        token : null,
        refToken : null,

        url : function(url){
           return this.urlBase + url;
        },

        ajaxLogin : function(email,senha,success,error){
           this.post("/login/",{email : email, senha : senha}).success(function(data){
                service.token = data.token;
                //service.isAdmin = data.admin || false;
                storage.put('token', data.token);
                $http.defaults.headers.common.Authorization= service.authBearer();
                $http.defaults.useXDomain = true;

                $rootScope.$broadcast("auth.logged");
       }).error(function(data,status){
                if(error)
                    error(data,status);
           });
        },

        recoverPassword : function(email){
          this.post("/auth/password/recover/",{email : email}).success(function(){
              $rootScope.$broadcast("auth.password.recovered");
          }).error(function(){
              $rootScope.$broadcast("auth.password.recover.emailNotFound");
          });
        },

        logout : function(){
            this.post("/logout",{}).success(function(data){
                storage.remove('token');
                service.token = null;

                if(isApp)
                  state.go('login');
                else
                  window.location = "/";

                $rootScope.$broadcast("auth.logged.out");
            });
        },

        authBearer : function(){
            return "Bearer "+service.token;
        },

        checkAuth : function(){

            if(!storage.get('token')){
              return false;
            }else if(!service.token){
                service.token = storage.get('token');
            }

            return true;
        },

        get : function(url){
            loading.on();
            return $http.get(this.url(url))
                        .error(this.errorFunc).success(loading.off).error(loading.off);
        },

        post : function(url,data){
            loading.on();
            return $http.post(this.url(url),data)
                        .error(this.errorFunc).success(loading.off).error(loading.off);
        },

        put : function(url,data){
            loading.on();
            return $http.put(this.url(url),data)
                        .error(this.errorFunc).success(loading.off).error(loading.off);
        },

        delete : function(url){
            loading.on();
            return $http.delete(this.url(url),{headers :{"Content-type":"text/plain"}})
                        .error(this.errorFunc).success(loading.off).error(loading.off);
        },

        errorFunc : function(data, status, headers, config){

            if(data.error)
                alert.show(data.error);
            else
                console.log("Erro de conexão com o servidor!");
        }

    };


    return service;
}]);
