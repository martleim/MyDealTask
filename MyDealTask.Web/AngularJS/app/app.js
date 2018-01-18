(function () {

	
    var app = angular.module("myDealTask", ["ngRoute", "ui.bootstrap"])
    .constant("appConfig", appConfig)
    .config(function ($routeProvider, $locationProvider, $provide, $httpProvider, appConfig) {
        var sections = appConfig.sections;
		//$locationProvider.html5Mode(true).hashPrefix('');

        $routeProvider
			.when("/home", {
                controller: "HomeController",
                templateUrl: sections + "home/home.tpl.html"
            })
			.when("/nameList", {
                controller: "NameListController",
                templateUrl: sections + "nameList/nameList.tpl.html"
            })
			.otherwise({ redirectTo: "/home" });

        /*handl http errors*/
        $provide.factory("appHttpInterceptor", ['$rootScope',
            function ($rootScope) {
                return {
                    responseError: function (rejection) {
                        if (rejection.status == 500) {
                            $rootScope.$emit("serviceError", rejection);
                        }
                    }
                };
            }
        ]);
        $httpProvider.interceptors.push('appHttpInterceptor');
    })
	.controller("navBarController", function($scope, $location){
		$scope.isActive = function (viewLocation) { 
			return viewLocation === $location.path();
		};
	})
	.run(
    function ($rootScope, $location, modalService) {

        $rootScope.$on("serviceError", function (event, rejection) {
            var modalOptions = {
                bodyText: rejection.data,
                actionButtonText: "",
                headerText: rejection.statusText
            };

            modalService.showModal({}, modalOptions);
        });

    });



    Array.prototype.select = function (predicateFn) {
        var arr = this;

        if (!predicateFn) {
            if (arr.length > 0) {
                return arr;
            }
        } else {
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                var value = predicateFn(arr[i]);
                ret.push(value);
            }
            return ret;
        }
        return null;
    };

    Array.prototype.where = function (predicateFn) {
        var arr = this;

        if (!predicateFn) {
            if (arr.length > 0) {
                return arr;
            }
        } else {
            var arr2 = [];
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                if (predicateFn(value, i)) {
                    arr2.push(value);
                }
            }
            return arr2;
        }
        return null;
    };

    Array.prototype.groupBy = function (att, converter) {
        var attValues = {};
        var array = this;
        for (var i = 0; i < array.length; i++) {
            if (converter) {
                attValues[converter(array[i][att])] = [];
            } else {
                attValues[array[i][att]] = [];
            }
        }
        for (var value in attValues) {
            attValues[value] = array.where(function (el) {
                return (converter) ? converter(el[att]) == value : el[att] == value;
            });
        }
        return attValues;
    };

}());