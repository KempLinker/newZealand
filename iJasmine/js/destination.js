function handleScrollDestinationFunc() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var $destinationMapLayer = $('#destination-map-layer');
    var layerLeft = $destinationMapLayer.offset().left;
    var $destinationInfo = $('.destination-info');
    var diffTop = $destinationInfo.offset().top + 36;
    var footerTop = $('.footer').length > 0 && $('.footer').offset().top;

    if( scrollTop > diffTop - 56 ){
        if( !$destinationMapLayer.hasClass('scroll-layer') ){
            $destinationMapLayer.addClass('scroll-layer');
            $destinationMapLayer.css({
                "position": "fixed",
                "top": "56px",
                "left": layerLeft + "px"
            });
        }
        if( footerTop <= scrollTop + clientHeight ){
            $destinationMapLayer.css({
                "position": "fixed",
                "top": 56 - ( scrollTop + clientHeight - footerTop ) + "px",
                "left": layerLeft + "px"
            });

        } else if( $destinationMapLayer.hasClass('scroll-layer') ){
            $destinationMapLayer.css({
                "position": "fixed",
                "top": "56px",
                "left": layerLeft + "px"
            });
        }



    } else{
        if( $destinationMapLayer.hasClass('scroll-layer') ){
            $destinationMapLayer.removeClass('scroll-layer');
            $destinationMapLayer.css({
                "position": "absolute",
                "left": "auto",
                "top": "36px",
                "right": "0"
            });
        }

    }
}