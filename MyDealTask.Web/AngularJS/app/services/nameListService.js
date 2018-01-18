(function () {

    angular.module("myDealTask").factory("nameListService", ["$http", "$q", function ($http, $q) {
        var modelUrl = appConfig.baseUrl + appConfig.controllers.passengerList,
            factory = {};
			
		factory.files=[];
        
		factory.get = function (id) {
		    id = (id) ? "/" + id : "";
            return $http.get(modelUrl +id);
        };
        factory.delete = function (id) {
            return $http.delete(modelUrl + "/" +id);
        };
        factory.put = function (id, element) {
            return $http.delete(modelUrl + "/" +id, element);
        };
        factory.post = function(file){
            var fd = new FormData();
 
            fd.append("file", file); 
            return $http.post(modelUrl, fd, {
                withCredentials : false,
                headers : {
                    'Content-Type' : undefined
                },
                transformRequest : angular.identity
            });
        }
        factory.initialize = function(){
        	
        }
		
        return factory;
    }]);

}());