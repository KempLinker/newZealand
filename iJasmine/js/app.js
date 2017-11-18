var iJasmineApp = angular.module('iJasmine', ['ui.router']);


iJasmineApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // 配置路由
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/component/home.html',
            controller: 'homeCtrl'

        })
    }
]);

iJasmineApp.run(['$rootScope',
    function($rootScope){

        var path = window.location.href;
        if( path.indexOf('index') >= 0 ){
            $rootScope.view = 'home';

        } else if( path.indexOf('destination') >= 0 ) {
            $rootScope.view = 'destination';

        } else if( path.indexOf('custom') >= 0 ) {
            $rootScope.view= 'custom';

        } else if( path.indexOf('travels') >= 0 ) {
            $rootScope.view = 'travels';

        } else {
            $rootScope.view = 'home';
        }

        $rootScope.headerLoadReady = function(){

            if( $rootScope.view == 'custom' || $rootScope.view == 'travels' ) {
                $(window).on('scroll.header', function () {
                    handleScrollFunc()
                });
                handleScrollFunc();
            }
            initHeaderEvent();

        };

        $rootScope.footerLoadReady = function(){

        };

        $rootScope.contactLoadReady = function(){

        };

    }
]);

function handleScrollFunc(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var $header = $('header');
    var $headerParent = $header.parent();
    if( scrollTop > 30 ){
        $headerParent.removeClass('transparent-header');

    } else{
        $headerParent.addClass('transparent-header');
    }
}
function initHeaderEvent(){
    var $destinationNavList = $('.sub-nav-list.destination');
    $('.nav-item.destination').on('mouseover',function(){
        $destinationNavList.slideDown(200);
    });
    $('.nav-item.destination').on('mouseleave',function(){
        $destinationNavList.slideUp(200);
    });
}
