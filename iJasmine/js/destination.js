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