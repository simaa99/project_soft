jQuery(function ($) {
wow= new WOW({
  mobile:false
})
wow.init({});
    $(window).scroll(function () {
      
        scrollTop = $(window).scrollTop();

        if (scrollTop > $('header').height()) {
           
            $('header').addClass('scrollNav');


        }

        else {
            $('header').removeClass('scrollNav');
        }
        if (($(window).scrollTop() + $(window).height()) > $(document).height()) {

            $(".up").stop(true).animate({
                opacity: 1
            }, 100);

        } else {

            $(".up").stop(true).animate({
                opacity: 0
            }, 250);
        }
    
    });
    $(".up").on("click", function () { $("html, body").animate({ scrollTop: 0 }, "slow"); return false; });
        $('.aboutSlider').owlCarousel({
          autoplay: false,
          loop: true,
          rtl:true,
          items:1,
          margin:15,
          dots:true
         
        });
        $('.MessageSlider').owlCarousel({
          autoplay: false,
          loop: true,
          rtl:true,
          items:1,
          margin:15,
          dots:true,
          nav:true,
          dotsContainer: '.sliderDots',
          navText : ['<i class="lni lni-chevron-right"></i>','<i class="lni lni-chevron-left"></i>'],
         
        });
        $('.projectSlider').owlCarousel({
          autoplay: false,
          loop: true,
          rtl:true,
          items:3,
          margin:0,
          dots:false,
          nav:false,
        responsive:{
          0:{
            items:1,
          },
          600:{
            items:2,
          },
          1000:{
            items:3,
          }
        }
         
        });
        $('.sliderDots').on('click', 'li', function(e) {
          $(".MessageSlider").trigger('to.owl.carousel', [$(this).index(), 300]);
         });
     
      
      function onScroll(event){
        var scrollPosition = $(document).scrollTop();
      $('.nav-link[href^="#"').each(function () {
        console.log($(this).attr('href')); 
        var refElement = $($(this).attr("href"));
      //   console.log($(this).attr("href")); //log
        if (refElement.length&&refElement.position().top-100 <= scrollPosition) {
        $('.nav-link').removeClass("active");
        $(this).addClass("active");
        }
        else if( $(document).scrollTop() <= 100){
          $('.nav-link').removeClass("active");
          $('.nav-link.home').addClass("active");
        }
        else{
        $(this).removeClass("active"); 
      
        }
      });
    }
    if( $(window).width()< 767){
      $(".nav-link").click(function(){
        $(".overlay").css("display","none")
        $(".collapse").collapse('hide') ;
      })
    }
    $(document).on("scroll", onScroll);
    $('.navbar-collapse .nav-link').on('click', function () {
      $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
    
      return false;
    });
    $(".navbar-toggler").click(function(){
      $(".overlay").css("display","block");
    });
    $(".overlay").click(function(){
      $(this).css("display","none");
      $(".collapse").collapse('hide') 
    });
    $(".close").click(function(){
      $(".overlay").css("display","none");
      $(".collapse").collapse('hide') 
    })
});

