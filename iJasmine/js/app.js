var iJasmineApp = angular.module('iJasmine', []);

iJasmineApp.controller('iJasmineCtrl', function($scope,$http) {


    var path = window.location.href;
    $scope.viewData = {
        view: 'home',
        destination: 'destination',
        geoData: null,
        geoInfo: {
            geoKey: "New Zealand",
            geoName: "新西兰"
        }
    };

    if( path.indexOf('index') >= 0 ){
        $scope.viewData.view = 'home';

    } else if( path.indexOf('destination') >= 0 ) {
        $scope.viewData.view = 'destination';

    } else if( path.indexOf('custom') >= 0 ) {
        $scope.viewData.view = 'custom';
    }

    $scope.headerLoadReady = function(){
        handleScrollFunc();
        initHeaderEvent();

    };

    $scope.footerLoadReady = function(){

    };

    $scope.contactLoadReady = function(){

    };

    $scope.$on('emitUpdateGeoInfo',function(e, data){
        $scope.viewData.geoInfo = data;
        $scope.$apply();
    });
    $(window).off('scroll.destination');

    $http.get('src/jsonData/geoData.json').then(function (result) {
        $scope.viewData.geoData = result.data;
    });

    if( $scope.viewData.view == 'home' ){


    }

    if( $scope.viewData.view == 'destination' ){
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
        $(window).on('scroll.destination',function(){
            handleScrollDestinationFunc();
        });

    }

    $scope.toggleDetail = function( event ){
        toggleDetail(event);
    }



});
