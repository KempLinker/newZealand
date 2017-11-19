(function() {

    angular.module("iJasmine").controller('destinationCtrl', destinationCtrl);

    destinationCtrl.$inject = ['$timeout','$scope', '$http'];

    function destinationCtrl($timeout, $scope, $http) {

        $scope.viewData = {
            init: false,
            banner: {
                src: [],
                time: 1000,
            },
            destinationInfo: {}
        };

        $http.get('src/jsonData/destinationData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData(data){
            $scope.viewData.banner = data.banner;
            $scope.viewData.destinationInfo = data.info;
            $("#scroll_banner").scrollBanner({
                images: $scope.viewData.banner.src,
                scrollTime: $scope.viewData.banner.time,
                bannerWidth: "1080px",
                bannerHeight:"500px",
                iconColor: "#FFFFFF",
                iconHoverColor : "#f76459",
                iconPosition : "center"
            });
            $(window).on('scroll.destination',function(){
                handleScrollDestinationFunc();
            });
        }

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

