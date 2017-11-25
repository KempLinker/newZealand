(function() {

    angular.module("iJasmine").controller('articleCtrl', articleCtrl);

    articleCtrl.$inject = ['$scope','$http'];

    function articleCtrl($scope, $http) {

        var urlObj = new urlParam();
        $scope.viewData = {
            init: false,
            banner: {
                src: [],
                time: 1000,
            },
            curArea: '',
            areaList: [],
            destinationInfo: {}
        };

        $http.get('src/article/'+urlObj.article+'.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData(data){
            console.log(data);
        }

        function urlParam() {
            var name = '', value = '';
            var str = window.location.href;
            var num = str.indexOf("?")
            str = str.substr( num + 1 );
            var arr = str.split("&");
            for( var i = 0; i < arr.length; i ++ ){
                num = arr[i].indexOf("=");
                if( num > 0 ){
                    name = arr[i].substring( 0, num );
                    value = arr[i].substr( num + 1 );
                    this[name] = value;
                }
            }
        }

    }
})();

