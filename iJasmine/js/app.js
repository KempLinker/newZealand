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

    $scope.$on('emitUpdateGeoInfo',function(e, data){
        $scope.viewData.geoInfo = data;
        console.log($scope.viewData)
        $scope.$apply();
    });

    $http.get('src/jsonData/geoData.json').then(function (result) {
        $scope.viewData.geoData = result.data;
    });


});
