(function () {

    angular.module('myDealTask').factory('dataService', ['nameListService', 
    function (nameListService) {
        this.nameListService = nameListService;
        
        return this;
    }]);

}());