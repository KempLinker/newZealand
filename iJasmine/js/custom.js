function toggleDetail( ev ){
    var $tarDom = $(ev.target);
    var $parentDom = $tarDom.parents('li');
    var $detailDom = $parentDom.find('.step-detail');
    if( $parentDom.hasClass('active') ){
        $detailDom.slideUp();
        $parentDom.removeClass('active');
        $tarDom.text('查看');

    } else{
        $detailDom.slideDown();
        $parentDom.addClass('active');
        $tarDom.text('收起');
    }
}