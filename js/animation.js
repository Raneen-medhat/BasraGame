$('.start-play').on("click",function(){
    $('main').css({"display":"inline"})
    $('.animation').css({"display":"none"})
    $('body').css({'background':'url(images/bg2.jpg)' , 'background-repeat': 'no-repeat',
    'background-size':'cover',    'background-blend-mode': 'soft-light'})
})
$('.avatars').on("click","img",function(){
    $(this).css({"width": "110px","box-shadow": "0px 0px 20px #c71c16"})
     $('.player-img img').attr('src', $(this).attr('src'))
    // $('.player-img').append(img)
    $('.player_Score h2').text($('input').val())
})


