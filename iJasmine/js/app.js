var iJasmineApp = angular.module('iJasmine', []);

iJasmineApp.controller('iJasmineCtrl', function($scope,$http) {

    $scope.viewData = {
        geoData: null,
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

    };

    $http.get('src/jsonData/geoData.json').then(function (result) {
        $scope.viewData.geoData = result.data;
    });


});
