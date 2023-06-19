$(function () {
  // Auto play modal video
  $(".video").click(function () {
    var theModal = $(this).data("target"),
      videoSRC = $(this).attr("data-video"),
      videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + ' iframe').attr('src', videoSRCauto);
    $(theModal + ' button.close').click(function () {
      $(theModal + ' iframe').attr('src', videoSRC);
    });
  });
});


$(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
})

// counter


let nCount = selector => {
  $(selector).each(function () {
    $(this)
      .animate({
        Counter: $(this).text()
      }, {
        // A string or number determining how long the animation will run.
        duration: 4000,
        // A string indicating which easing function to use for the transition.
        easing: "swing",
        /**
         * A function to be called for each animated property of each animated element. 
         * This function provides an opportunity to
         *  modify the Tween object to change the value of the property before it is set.
         */
        step: function (value) {
          $(this).text(Math.ceil(value) + "+");
        }
      });
  });
};


$(document).ready(function () {

  // bootstrap bg-corousel

  // let a = 0;
  // $(window).scroll(function () {
  //   // The .offset() method allows us to retrieve the current position of an element  relative to the document
  //   let oTop = $(".numbers").offset().top - window.innerHeight;
  //   if (a == 0 && $(window).scrollTop() >= oTop) {
  //     a++;
  //     nCount(".rect > h4");
  //   }
  // });
  $('.bg-carousel').carousel({
    interval: 3000,
    autoplayHoverPause: false,

  })

  // equipment corousel


  $('.cr-equipment-carousel').owlCarousel({
    loop: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      800: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  })

  // services corousel


  $('.cr-service-corousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 1
      },

      600: {
        items: 2
      },
      900: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  })

  // testiminial corousel

  $('.cr-testimonials-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    transitionStyle: 'fade',
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 1
      },
      800: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  })

  // brand corousel

  $('.cr-footer-carousel').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      800: {
        items: 3
      },
      1024: {
        items: 4
      },
      1600: {
        items: 5

      }



    }
  })



});










