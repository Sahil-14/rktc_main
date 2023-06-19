function setModel(blog){
    document.getElementById('blog-title').innerHTML=blog.title;
     document.getElementById('blog-img').src=blog.image; 
    document.getElementById('blog-content').innerHTML=blog.content; 
     document.getElementById('blog-date').innerHTML="Writen by "+blog.writenBy+"\n date:"+blog.date;
}
   


$(document).ready(function(){
    let $btns = $('.project-area .button-group button');


    $btns.click(function (e) {

        $('.project-area .button-group button').removeClass('active'); // removing active from all
        e.target.classList.add('active');  // adding active to selected button

        let selector = $(e.target).attr('data-filter');  // getting data-filter of selected button
        $('.project-area .grid').isotope({
            filter: selector
        });

        return false;
    })

    //  THIS OPENS IMAGE GALLARY AFTER CLIKING IMAGE
    $('.project-area .button-group #btn1').trigger('click');

    // FOR COROUSOL in image
    $('.project-area .grid .test-popup-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }  
    });

    $('.site-main .about-area .owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        dots: true,
        responsive: {
            0: {
                items: 1   //for 0px to 544 px only  one item
            },
            560: {
                items: 2
            }
        }
    })

});
