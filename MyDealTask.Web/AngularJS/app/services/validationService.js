(function () {

    var validationService = function ($http) {
        var modelUrl = appConfig.baseUrl+appConfig.controllers.validation,
            factory = {};
			
		factory.getValidation = function (element,objectName) {
            return $http.get(modelUrl + "?dtoObjectName=" + element + "&jsonObjectName=" + objectName);
        };

        return factory;
    };

    validationService.$inject = ["$http"];

    angular.module("myDealTask").factory("validationService", validationService);

}());