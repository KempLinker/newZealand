

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
