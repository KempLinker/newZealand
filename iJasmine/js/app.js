var iJasmineApp = angular.module('iJasmine', []);

iJasmineApp.controller('iJasmineCtrl', function($scope,$http) {


    $scope.viewData = {
        view: 'home',
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
        $scope.$apply();
    });

    $http.get('src/jsonData/geoData.json').then(function (result) {
        $scope.viewData.geoData = result.data;
    });

    if( $("#scroll_banner").scrollBanner ){
        $("#scroll_banner").scrollBanner({
            images : [
                {src:"src/imgs/6.jpg",title:"banner1"},
                {src:"src/imgs/7.jpg",title:"banner2"},
                {src:"src/imgs/8.jpg",title:"banner3"},
                {src:"src/imgs/9.jpg",title:"banner4"}
            ],
            scrollTime: 4000,
            bannerWidth:"1080px",
            bannerHeight:"500px",
            iconColor: "#FFFFFF",
            iconHoverColor : "#f76459",
            iconPosition : "center"
        });
    }



});
