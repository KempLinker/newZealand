(function() {

    angular.module("iJasmine").controller('sampleCtrl', sampleCtrl);

    sampleCtrl.$inject = ['$scope','$http'];

    function sampleCtrl($scope,$http) {

        $scope.viewData = {
            init: false,
            list: []
        };

        $http.get(__Public+'/jsonData/travelsData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData( data ){
            $scope.viewData.list = data.list;
            $scope.viewData.list.forEach(function (item) {
                item.href = item.href + '&type=sample';
            })
        }

    }
})();

