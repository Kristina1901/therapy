(function($) {
    $(function() {

        $('.header-area').sticky({
            topSpacing:0
        });
                
        $('#menu').slicknav({
            label: '',
            prependTo: '.header-area .container',
            closeOnClick: true,
        });

        $('.patient-carousel').owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dots: true,
            margin: 30,
            autoplay: true,
            autoplaySpeed: 3000,
            autoplayHoverPause: true,
            smartSpeed: 2500,
            responsiveClass: true,
            responsive: {
                0:{
                    items: 1,
                },
                480:{
                    items: 1,
                },
                767:{
                    items: 1,
                },
                992:{
                    items: 1,
                    dots: true,
                }
            }
        });
        
        $('.owl-carousel').owlCarousel({
            items: 4,
            loop: true,
            nav: false,
            dots: true,
            margin: 30,
            autoplay: true,
            autoplaySpeed: 3000,
            autoplayHoverPause: true,
            smartSpeed: 2000,
            responsiveClass: true,
            responsive: {
                0:{
                    items: 1,
                },
                479:{
                    items: 2,
                },
                767:{
                    items: 3,
                },
                992:{
                    items: 4,
                }
            }
        });

        $('.play-btn').magnificPopup({
            type: 'video'
        });

        $(".select").click(function() {
            $(this).addClass('').removeClass('empty');
        });

    });


    var wow = new WOW({
        });
    wow.init();

     setTimeout(function(){
        $('.preloader').fadeToggle();
    }, 1000);
    
})(jQuery);
