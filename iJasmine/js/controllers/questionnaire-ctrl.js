(function() {

    angular.module("iJasmine").controller('questionnaireCtrl', questionnaireCtrl);

    questionnaireCtrl.$inject = ['$scope','$http'];

    function questionnaireCtrl($scope,$http) {

        $scope.viewData = {
            init: false,
            list: [],
            submitFunc: submitFunc
        };

        $http.get(__Public+'/jsonData/questionnaireData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData( data ){
            $scope.viewData.list = data.questionnaireList;
        }

        function submitFunc() {
            var list = $scope.viewData.list;
            var validFlag = true;
            var finalObj = {
                user: {},
                number: {},
                time: {},
                nature: {},
            };
            // 联系人
            var user = list['user'][0];
            user.sub.forEach(function(item){
                finalObj['user'][item.key] = item.val
            });
            // 出行人数
            var number = list['numberOfPeople'][0];
            finalObj['number'].val = number.val;
            finalObj['number'].detail = [];
            number.sub.forEach(function(item){
                finalObj['number'].detail.push(item.val || -1);
            });
            // 旅行天数
            var time = list['travelTime'][0];
            finalObj['time'].type = time.val;
            finalObj['time'].val = time.sub[0].val;
            finalObj['time'].detail = [];
            time.sub[0].sub.forEach(function(item){
                if( item.val == time.val ){
                    item.sub.forEach(function(i){
                        finalObj['time'].detail.push(i.val || -1);
                    });
                }
            });
            // 旅行性质
            var nature = list['travelNature'][0];
            console.log(nature);
            console.log(finalObj);
        }

    }
})();

