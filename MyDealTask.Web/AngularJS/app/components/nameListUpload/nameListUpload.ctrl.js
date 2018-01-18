(function () {

    angular.module('myDealTask').filter('customfilter', function () {
        return function( items, opts) {
            var filtered = [];

            angular.forEach(items, function (item) {
                if (opts.filterFunction(item,opts.value)) {
                    filtered.push(item);
                }

            });

            return filtered;
        };
    });

    angular.module('myDealTask').controller('NameListUploadController', ['$scope', '$location', '$filter', 'dataService', 'appConfig','modalService',
    function ($scope, $location, $filter, dataService, appConfig, modalService) {

        $scope.file = null;
        $scope.filterOptions = {
            value: "", filterFunction: function (el, val) {
                
                var validator = function (element, value) {
                    var regex = new RegExp(value);
                    return (value == "") ||
                    (value != "" && element.code && element.code.match(regex)!=null) ||
                    (value != "" && element.firstName && element.firstName.match(regex) != null) ||
                    (value != "" && element.lastName && element.lastName.match(regex) != null);
                }
                var matchingInner = (el.passengerRecords && el.passengerRecords.where(function (el) {
                    return validator(el, val);
                }).length>0);
                return validator(el, val) || matchingInner;
            }
        };
        $scope.uploadedData = null;
        
        $scope.selectedFile = function (element) {
            $scope.$apply(function ($scope) {
                if (element.files.length)
                    $scope.file = element.files[0];
            });
        }

        $scope.uploadFile = function () {
            dataService.nameListService.post($scope.file).then(function (res) {
                $scope.uploadedData = res.data;
            });
        }

        var nameListUpload = appConfig.components + "nameListEdit/nameListEdit.tpl.html"

        $scope.editList = function () {

            var modalOpts = {
                // backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: nameListUpload
            };

            var modalOptions = {
                file:$scope.file
            };

            modalService.showModal(modalOpts, modalOptions).then(function (result) {
                if (result && result.status == "updated")
                    $scope.file = result.file;

                //$scope.updatePNLFiles();
            });
        };

    }
    ]);
    
}());