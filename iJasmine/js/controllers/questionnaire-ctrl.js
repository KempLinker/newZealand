(function() {

    angular.module("iJasmine").controller('questionnaireCtrl', questionnaireCtrl);

    questionnaireCtrl.$inject = ['$scope','$http'];

    function questionnaireCtrl($scope,$http) {

        $scope.viewData = {
            init: false,
            list: []
        };

        $http.get(__Public+'/jsonData/questionnaireData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData( data ){
            $scope.viewData.list = data.questionnaireList;
        }

    }
})();

