
$(document).ready(function(){

    $('.more-content').on('click', function(){
        var cont = $(this).attr('name');
        location.href = cont + ".html";
        return false;
    });

    $('.reply').on('click', function(){
        $('.fixed-action-btn').hide();
        $('.reply-container').removeClass('animated bounceOutDown');
        $('.reply-container').addClass('animated bounceInUp');
        $('.reply-container').show();
    });

    $('.reply-close').on('click', function(){
        $('.fixed-action-btn').show();
        $('.reply-container').removeClass('animated bounceInUp');
        $('.reply-container').addClass('animated bounceOutDown');
    });

    $('a[name=history-back]').on('click', function(){
        history.back();
    });

    $('div[name=link-thumbnail]').on('click', function(){
        location.href = "detail-ins.html";
        return false;
    });

    $('.nav-item').on('click', function(){
        $(this).addClass('nav-on');
        $(this).siblings('.nav-item').removeClass('nav-on');

        var nav = $(this).attr('name');
        location.href = nav + ".html";
    });


 });