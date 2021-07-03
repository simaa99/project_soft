jQuery(function ($) {
  $(window).scroll(function () {
      
    scrollTop = $(window).scrollTop();

    if (scrollTop >($('.headerImg').height()+ 200)) {
        $('header').addClass('scrollNav');
    }

    else {
        $('header').removeClass('scrollNav');
    }

});

    $('.successSlider').owlCarousel({
        autoplay: true,
        loop: true,
        margin: 18,
        responsive: {
          0: {
            items: 1,
           margin:0
  
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          }
        }
      });
      $('.membersSlider').owlCarousel({
        autoplay: true,
        loop: true,
        margin: 20,
        responsive: {
          0: {
            items: 1,
           margin:0
  
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          }
        }
      });

});

$(".nav-link").click(function(){
$(".navbar-collapse").collapse("hide")
})