function toggleDetail( ev ){
    var $tarDom = $(ev.target);
    var $parentDom = $tarDom.parents('li');
    var $detailDom = $parentDom.find('.step-detail');
    if( $parentDom.hasClass('active') ){
        $detailDom.slideUp();
        $parentDom.removeClass('active')
    } else{
        $detailDom.slideDown();
        $parentDom.addClass('active')
    }
}