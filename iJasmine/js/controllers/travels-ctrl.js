(function() {

    angular.module("iJasmine").controller('travelsCtrl', travelsCtrl);

    travelsCtrl.$inject = ['$scope','$http'];

    function travelsCtrl($scope,$http) {

        $scope.viewData = {
            init: false,
            sort: {
                type: "ctime",
                val: "asc"
            },
            list: []
        };

        $scope.changeSort = changeSort;
        $http.get(__Public+'/jsonData/travelsData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData( data ){
            $scope.viewData.list = data.list;
        }

        function changeSort(){
            if( $scope.viewData.sort.val == 'asc' ){
                $scope.viewData.sort.val = 'desc'
            } else{
                $scope.viewData.sort.val = 'asc'
            }
        }

    }
})();

