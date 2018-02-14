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
                scene: {},
                stay: {},
                food: {},
                transportation: {},
                service: {},
                supplement: {}
            };
            // 联系人
            var user = list['user'][0];
            user.sub.forEach(function(item){
                finalObj['user'][item.key] = item.val;
                if( ['name', 'mobile', 'email'].indexOf(item.key) >= 0 && ( !item.val || item.val == '' ) ){
                    validFlag = false;
                }
            });
            if( !validFlag ){
                alert('联系人信息不完整，请补充');
                return false;
            }
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
            finalObj['nature'].detail = [];
            nature['sub'].forEach(function(item){
                if( !!item.val ){
                    if( item.key == "others" ){
                        finalObj['nature'].detail.push(item.val);
                    } else{
                        finalObj['nature'].detail.push(item.title);
                    }
                }
            });
            // 景点风光
            var scene = list['sceneSport'][0];
            finalObj['scene'].detail = [];
            scene['sub'].forEach(function(item){
                var temp = {
                    type: item.key,
                    list: []
                };
                if( item.key == "others" ){
                    if( !!item.val ){
                        temp.list.push(item.val);
                    }
                } else {
                    item.sub.forEach(function(i){
                        if( !!i.val ){
                            temp.list.push(i.title);
                        }
                    });
                }
                finalObj['scene'].detail.push(temp);
            });
            // 住宿
            var stay = list['stay'][0];
            finalObj['stay'].detail = [];
            stay['sub'].forEach(function(item){
                var temp = {
                    type: item.key,
                    list: []
                };
                item.sub.forEach(function(i){
                    if( !!i.val ){
                        temp.list.push(i.title);
                    }
                });
                finalObj['stay'].detail.push(temp);
            });
            // 饮食
            var food = list['food'][0];
            finalObj['food'].detail = [];
            food['sub'].forEach(function(item){
                var temp = {
                    type: item.key,
                    val: item.val,
                    list: []
                };
                if( item.key == "breakfast" ){
                    temp.list.push( item.val == "false" ? '是' : '否' );

                } else {
                    if( temp.val == 'A' ){
                        item.sub[0].sub.forEach(function(i){
                            if( !!i.val ){
                                temp.list.push(i.title);
                            }
                        });

                    } else{
                        temp.list.push('自理');
                    }

                }
                finalObj['food'].detail.push(temp);
            });
            // 交通方式
            var transportation = list['transportation'][0];
            finalObj['transportation'].type = transportation.val;
            finalObj['transportation'].detail = [];
            if( transportation.val == 'self' ){
                transportation['sub'].forEach(function(item){
                    if( item.key == 'self' ){
                        item['sub'].forEach(function(i){
                            var temp = {
                                type: '',
                                list: []
                            };
                            temp.type = i.key;
                            if( i.key == 'cars' ){
                                i.sub.forEach(function(j){
                                    if( !!j.val ){
                                        temp.list.push(j.title);
                                    }
                                });
                            } else{
                                temp.list.push( i.val == "false" ? '是' : '否' );
                            }
                            finalObj['transportation'].detail.push(temp);
                        });
                    }
                });
            }
            // 其他服务
            var service = list['service'][0];
            finalObj['service'].detail = [];
            service['sub'].forEach(function(item){
                if( !!item.val ){
                    finalObj['service'].detail.push(item.title);
                }
            });
            // 补充要求
            var supplement = list['supplement'][0];
            finalObj['supplement'].val = supplement.val;
            console.log(finalObj)
        }

    }
})();

