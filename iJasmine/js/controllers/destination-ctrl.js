(function() {

    angular.module("iJasmine").controller('destinationCtrl', destinationCtrl);

    destinationCtrl.$inject = ['$rootScope','$scope', '$http'];

    function destinationCtrl($rootScope, $scope, $http) {

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
        $(window).on('scroll.destination',function(){
            handleScrollDestinationFunc();
        });

        function handleScrollDestinationFunc() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var $destinationMapLayer = $('#destination-map-layer');
            var $destinationInfo = $('.destination-info');
            var containerTop = $destinationInfo.offset().top;
            var footerTop = $('.footer').length > 0 && $('.footer').offset().top;

            var diffTop = 0;
            if( scrollTop > containerTop - 56 ){

                if( footerTop - 4 <= scrollTop + clientHeight ){
                    return false;
                }
                diffTop = scrollTop - containerTop + 56;
                $destinationMapLayer.addClass('scroll-layer');
                $destinationMapLayer.css({
                    "top": 36 + diffTop+ "px",
                });

            } else{
                if( $destinationMapLayer.hasClass('scroll-layer') ){
                    $destinationMapLayer.removeClass('scroll-layer');
                    $destinationMapLayer.css({
                        "top": "36px"
                    });
                }

            }
        }

    }
})();

