var iJasmineApp = angular.module('iJasmine', []);

iJasmineApp.controller('baseCtrl', function($scope) {

    $scope.headerLoadReady = function(){
        handleScrollFunc();
        initHeaderEvent();

    };

    $scope.footerLoadReady = function(){

    }


});
