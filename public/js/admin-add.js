

    // $("#services-submit").on('click', function (event) {
    //     event.preventDefault();
    //     var $image = $('#uploadeImg').val();
    //     var $service_name = $('#service_name').val();
    //     var $s_dsc = $('#s_dsc').val();
    //     var $l_dsc = $('#l_dsc').val();
    //     var $highlights = $('#highlights').val();

    //     if ($image != '') {
    //         if ($service_name != '') {
    //             if ($s_dsc != '') {
    //                 if ($l_dsc != '') {
    //                         var $route = "http://localhost:8000/admin/services";
    //                         var data = {
    //                             image: $image,
    //                             service_name: $service_name,
    //                             s_dsc: $s_dsc,
    //                             l_dsc: $l_dsc
    //                             highlights:$highlights;
    //                         }
    //                          console.log(data);
                    
    //                         $.ajax({
    //                             type: 'POST',
    //                             url: $route,
    //                             data: data,
    //                             dataType: 'text',
    //                             contentType: false,
    //                             error: function(jqXHR, textStatus, errorThrown){
    //                               alert(textStatus, errorThrown);
    //                            }
    //                          });
                             
                          
    //                 } else {
    //                     alert("please write long decription");
    //                 }
    //             } else {
    //                 alert("please write short description");
    //             }

    //         } else {
    //             alert("please fill service name");
    //         }
    //     } else {
    //         alert("please select image");
    //     }

    // });
