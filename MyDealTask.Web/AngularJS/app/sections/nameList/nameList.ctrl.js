(function () {

    angular.module('myDealTask').controller('NameListController', ['$scope', '$location', '$filter', 'dataService', 'modalService', 'appConfig',
    function ($scope, $location, $filter, dataService, modalService, appConfig) {

        var nameListUpload = appConfig.components + "nameListUpload/nameListUpload.tpl.html"

        $scope.pnlFiles = [];

        $scope.uploadList = function () {
            $scope.openListModal();
        };

        $scope.openListModal = function (event) {

            var modalOpts = {
                // backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: nameListUpload
            };

            var modalOptions = {
                
            };

            modalService.showModal(modalOpts, modalOptions).then(function (result) {
                $scope.updatePNLFiles();
            });
        };

        $scope.updatePNLFiles = function () {
            dataService.nameListService.get().then(function (res) {
                $scope.pnlFiles = res.data;
            });
        }

        $scope.getNames = function (file) {
            var names = [];
            file.recordLocator.select(function (rl) {
                names=names.concat(rl.passengerRecord.select(function (pr) {
                    var pr2 = angular.copy(pr);
                    pr.code = rl.code;
                    return pr;
                }));
            });
            
            return names;
        }

        $scope.deleteFile = function (item) {
            function deleteItem() {
                dataService.nameListService.delete(item.id).then(function (res) {
                    $scope.updatePNLFiles();
                });
            }
            
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Element',
                headerText: 'Delete?',
                bodyText: 'Are you sure you would like to delete this element?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    deleteItem();
                }
            });
        }

        function init() {
            //dataService.eventsService.initialize().then(function(p) {
            $scope.updatePNLFiles();
            //});
        }
        init();

    }
    ]);
    
}());