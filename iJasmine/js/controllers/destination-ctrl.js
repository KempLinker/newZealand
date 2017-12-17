(function() {

    angular.module("iJasmine").controller('destinationCtrl', destinationCtrl);

    destinationCtrl.$inject = ['$timeout','$scope', '$http'];

    function destinationCtrl($timeout, $scope, $http) {

        var urlObj = new urlParam();
        $scope.viewData = {
            init: false,
            banner: {
                src: [],
                time: 1000,
                img: null
            },
            curArea: '',
            areaList: [],
            destinationInfo: {}
        };

        $http.get(__Public+'/jsonData/destinationData.json').then(function (result) {
            handleData(result.data);
            $scope.viewData.init = true;
        });

        function handleData(data){
            $scope.viewData.banner = data.banner;
            $scope.viewData.areaList = data.areaList;
            if( urlObj && urlObj.area ) {
                $scope.viewData.areaList.map(function (area) {
                    if (area.areaId.toLocaleLowerCase() == urlObj.area.toLocaleLowerCase()) {
                        $scope.viewData.destinationInfo = area;
                        $scope.viewData.curArea = area.areaId;
                    }
                });
            }
            if( $.isEmptyObject($scope.viewData.destinationInfo) ){
                $scope.viewData.destinationInfo = $scope.viewData.areaList[0];
                $scope.viewData.curArea = $scope.viewData.destinationInfo.areaId;
            }
            initScrollBanner();

            $(window).on('scroll.destination',function(){
                handleScrollDestinationFunc();

            });
            $(window).on('resize.destination',function(){
                initScrollBanner();
            });
        }

        function initScrollBanner(){
            if( !$scope.viewData.banner.src || $scope.viewData.banner.src.length < 1 ){
                return false
            }
            if( $scope.viewData.banner.src.length == 1 ){
                $scope.viewData.banner.img = $scope.viewData.banner.src[0].src;
                return false
            }

            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var scrollBannerWidth = 1080;
            var scrollBannerHeight = 440;
            if( windowWidth <= 1100 && windowWidth >= 960 ){
                scrollBannerWidth = 900;
                scrollBannerHeight = 400;

            } else if( windowWidth >= 768 && windowWidth < 960 ){
                scrollBannerWidth = 700;
                scrollBannerHeight = 350;

            } else if (  windowWidth >= 460 && windowWidth < 768 ){
                scrollBannerWidth = windowWidth;
                scrollBannerHeight = 300;

            } else if ( windowWidth < 460 ){
                scrollBannerWidth = windowWidth;
                scrollBannerHeight = 200;
            }

            $("#scroll_banner").scrollBanner({
                images: $scope.viewData.banner.src,
                scrollTime: $scope.viewData.banner.time,
                bannerWidth: scrollBannerWidth + 'px',
                bannerHeight: scrollBannerHeight + 'px',
                iconColor: "#FFFFFF",
                iconHoverColor : "#f76459",
                iconPosition : "center"
            });
        }

        function handleScrollDestinationFunc() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var $destinationMapLayer = $('#destination-map-layer');
            var $destinationInfo = $('.destination-info');
            var containerTop = $destinationInfo.offset().top;
            var containerHeight = $('.main-body').height() + 64;

            var diffTop = 0;
            if( scrollTop > containerTop - 56 - 32 ){
                if( containerHeight <= scrollTop ){
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
                        "top": 0
                    });
                }

            }
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

