var iJasmineApp = angular.module('iJasmine', []);

iJasmineApp.controller('iJasmineCtrl', function($scope) {

    $scope.viewData = {
        geoInfo: {
            geoKey: "New Zealand",
            geoName: "新西兰"
        }
    };

    $scope.headerLoadReady = function(){
        handleScrollFunc();
        initHeaderEvent();

    };

    $scope.footerLoadReady = function(){

    }


});
