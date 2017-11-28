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

        var path = window.location.href;
        if( path.indexOf('index') >= 0 ){
            $rootScope.view = 'home';

        } else if( path.indexOf('destination') >= 0 ) {
            $rootScope.view = 'destination';

        } else if( path.indexOf('custom') >= 0 ) {
            $rootScope.view= 'custom';

        } else if( path.indexOf('travels') >= 0 || path.indexOf('article') >= 0 ) {
            $rootScope.view = 'travels';

        } else {
            $rootScope.view = 'home';
        }

        $rootScope.headerLoadReady = function(){
            $http.get('src/jsonData/headerData.json').then(function (result) {
                $rootScope.areaList = result.data.areaList;
            });
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

        $rootScope.openHeaderDialog = function(){
            ngDialog.open({
                template: '/component/consultDialog.html',
                className: 'ngdialog-theme-default consult-dialog'
            });
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
