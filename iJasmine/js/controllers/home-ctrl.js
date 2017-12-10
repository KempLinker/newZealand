(function() {

    angular.module("iJasmine").controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$rootScope','$scope', '$http'];

    function homeCtrl($rootScope, $scope, $http) {

        $scope.viewData = {
            geoData: null,
            geoInfo: {
                geoKey: "New Zealand",
                geoName: "新西兰"
            }
        };

        $scope.$on('emitUpdateGeoInfo',function(e, data){
            $scope.viewData.geoInfo = data;
            $scope.$apply();
        });


        $http.get(__Public+'/jsonData/geoData.json').then(function (result) {
            $scope.viewData.init = true;
            $scope.viewData.geoData = result.data;
        });

    }
})();
