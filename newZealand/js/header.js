$(document).ready(function(){
    var $destinationNavList = $('.sub-nav-list.destination');
    $('.nav-item.destination').on('mouseover',function(){
        $destinationNavList.slideDown(200);
    });
    $('.nav-item.destination').on('mouseleave',function(){
        $destinationNavList.slideUp(200);
    });
});

$(window).on('scroll',function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var $header = $('header');
    if( scrollTop > 100 ){
        $header.addClass('scroll-header');

    } else{
        $header.removeClass('scroll-header');
    }
});
