(function () {

    angular.module('myDealTask').controller('NameListEditController', ['$scope', '$location', '$filter', 'dataService', 'appConfig','$timeout',
    function ($scope, $location, $filter, dataService, appConfig, $timeout) {

        $scope.file = $scope.$parent.modalOptions.file;
        $scope.fileContent = null;


        var reader = new FileReader();
        var tmp = $scope;
        reader.onload = function () {
            tmp.fileContent = reader.result;
            tmp.$digest();
        };
        reader.readAsText($scope.file);

        $scope.uploadedData = null;

        $scope.updateList = function () {
            var blob = new Blob([$scope.fileContent], { type: $scope.file.type });
            var fileOfBlob = new File([blob], $scope.file.name);
            $scope.$close({ status: "updated", file: fileOfBlob });
        }

        $scope.saveList = function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var blob = new Blob([$scope.fileContent], { type: $scope.file.type });
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = $scope.file.name;
            a.click();
            window.URL.revokeObjectURL(url);
            $timeout(function () {
                document.body.removeChild(a);
            }, 1000);
        }


    }
    ]);
    
}());