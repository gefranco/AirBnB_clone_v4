$( document ).ready(function() {
    console.log( "ready!" );
   
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function(json) {
        console.log(json);
        console.log(json.status);
        if (json.status === 'OK') {
          console.log("SSSSSSSSSSSSSSI");
          $('#api_status').toggleClass('available unavailable');
        }else {
          $('#api_status').toggleClass('unavailable');
        }
        
      }
    });


    amenities = {}
    
    $('input').change(function() {
      console.log('changed');
      if($(this).prop("checked")) {
        amenities[$(this).attr("data-id")] = $(this).attr("data-name");
      }else{
        delete amenities[$(this).attr("data-id")]
      }
      console.log(amenities);
      $('.amenities h4').text(Object.values(amenities).join(', '));
     
    });



});
