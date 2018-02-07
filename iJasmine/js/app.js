var iJasmineApp = angular.module('iJasmine', ['ngDialog']);

iJasmineApp.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: false,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false
    });
}]);

iJasmineApp.run(['$rootScope', '$http', 'ngDialog', function($rootScope, $http, ngDialog){

    window.__SRC = "__SRC__";
    window.__Public = "src";

    var path = window.location.href;
    if( path.indexOf('index') >= 0 ){
        $rootScope.view = 'home';

    } else if( path.indexOf('destination') >= 0 ) {
        $rootScope.view = 'destination';

    } else if( path.indexOf('custom') >= 0 ) {
        $rootScope.view= 'custom';

    } else if( path.indexOf('travels') >= 0 ) {
        $rootScope.view = 'travels';

    } else if( path.indexOf('sample') >= 0 ) {
        $rootScope.view = 'sample';

    } else if( path.indexOf('questionnaire') >= 0 ) {
        $rootScope.view = 'questionnaire';

    } else if( path.indexOf('article') >= 0 ) {
        $rootScope.view = 'article';

    } else {
        $rootScope.view = 'home';
    }

    $rootScope.headerLoadReady = function(){
        $http.get(__Public+'/jsonData/headerData.json').then(function (result) {
            $rootScope.areaList = result.data.areaList;
        });
        if( ['custom','travels','sample','questionnaire','article'].indexOf($rootScope.view) >= 0 ) {
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

    $rootScope.openHeaderDialog = function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        $('html,body').css({
            position:'fixed',
            top: - scrollTop + 'px',
            left: 0,
            right: 0
        });
        setTimeout(function(){
            $('header').parent().removeClass('transparent-header');
        }, 200);

        ngDialog.open({
            template: '/component/consultDialog.html',
            className: 'ngdialog-theme-default consult-dialog',
            preCloseCallback: function () {
                $('html,body').css({
                    position: 'static'
                });
                $(document).scrollTop(scrollTop);
            }
        });
    };

}]);

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
function toggleMobileList(){
    var $body = $('body');
    var $header = $('header');
    var $headerParent = $header.parent();
    if( $headerParent.hasClass('mobile-header') ){
        $headerParent.removeClass('mobile-header');
        $header.animate({
            height: '56px'
        }, 400);
        $body.css({
            'overflow-y': 'auto'
        })

    } else{
        $headerParent.addClass('mobile-header');
        $header.animate({
            height: '100%'
        }, 400);
        $body.css({
            'overflow-y': 'hidden'
        })
    }

}
function getUniqId(){
    function func(){
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (func() + func() + "-" + func() + "-" + func() + "-" + func() + "-" + func() + func() + func());
}
