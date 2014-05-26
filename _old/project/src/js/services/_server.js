
module.factory('server',['$rootScope','$state','$http','$timeout','storage','loading', 'alert', function ($rootScope, state, $http, $timeout, storage, loading, alert){


  var service = {
        urlBase : "",
        clientId :  !isApp ? "webClientHTML" :"appClientHTML",
        clientSecret : !isApp ? "" : "",
        token : null,
        refToken : null,

        url : function(url){
           return this.urlBase + url;
        },

        ajaxLogin : function(email,password,success,error){
           this.post("/auth/login/"+this.clientId,{email : email, password : password}).success(function(data){
                service.exchangeAuthCode(data.authCode, success);
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
            this.post("/auth/logout/",{}).success(function(data){
                storage.remove('token');
                storage.remove('refToken');
                service.token = null;
                service.refToken = null;

                if(isApp)
                  state.go('main');
                else
                  window.location = "/";

                $rootScope.$broadcast("auth.logged.out");
            });
        },

        clientHeader : function(){
            return {headers :{"Authorization":"Basic "+this.clientId+":"+this.clientSecret}};
        },

        authBearer : function(){
            return "Bearer "+service.token;
        },

        checkAuth : function(){

            if(!storage.get('token')){
              return false;
            }else if(!service.token){
                service.token = storage.get('token');
                service.refToken = storage.get('refToken');
                service.refreshToken();
            }

            return true;
        },

        exchangeAuthCode : function(authCode,callback){
            var json = {authCode : authCode};
            $http.post(this.url("/auth/exchangeAuthCode/"), json, this.clientHeader())
                .error(function(){
                    storage.remove('token');
                    storage.remove('refToken');
                })
                .success(function(data){
                    service.refToken = data.refreshToken;
                    service.token = data.token;
                    storage.put('token', data.token);
                    storage.put('refToken', data.refreshToken);
                    $http.defaults.headers.common.Authorization= service.authBearer();
                    $http.defaults.useXDomain = true;
                    $timeout(function(){service.refreshToken();},(data.expiresIn - 30)*1000);
                    if(callback)
                        callback();

                    $rootScope.$broadcast("auth.logged");
                });
        },

        refreshToken : function(){
          if(this.refToken){
            this.refreshing = true;
            var json = {token : this.token, refreshToken : this.refToken};
            $http.post(this.url("/auth/refreshToken/"),json, this.clientHeader())
                .error(function(){
                    storage.remove('token');
                    storage.remove('refToken');
                    service.refreshing = false;
                })
                .success(function(data){
                    storage.put('token',data.token);
                    service.token = data.token;
                    $http.defaults.headers.common.Authorization= service.authBearer();
                    $timeout(function(){service.refreshToken();},(data.expiresIn - 30)*1000);
                    service.refreshing = false;
                    $rootScope.$broadcast("auth.token.refreshed");
                });
          }
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

        goToLoginPage : function(){
            window.location = this.urlBase;
        },

        errorFunc : function(data, status, headers, config){

            if(data.error)
                alert.show(data.error);
            else
                alert.show("Erro de conexão com o servidor!");
        }

    };


    return service;
}]);