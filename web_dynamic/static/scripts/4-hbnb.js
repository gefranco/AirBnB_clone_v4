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



    
    $.ajax({
      type: 'POST',
      contentType: "application/json",
      data: '{}',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: "json",
      success: function(json) {
        console.log(json);
        let places = json;
        show_places(places);
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

    $('button').on('click', function(){
       console.log('the button');

      $.ajax({
       type: 'POST',
       contentType: "application/json",
       data: JSON.stringify({'amenities' : amenities}),
       url: 'http://0.0.0.0:5001/api/v1/places_search/',
       dataType: "json",
       success: function(json) {
           console.log(json);
           show_places(json);
       }
      });
    });

function show_places(places)
{
        $(".places").html("");  
        for (let place of places) {
           

           console.log(place.name)
           $(".places").append("<article>" +
               "<div class='title'>" +
               "<h2>"+place.name+"</h2>" +
               "<div class='price_by_night'>" +
               place.price_by_night +
               "</div>" +
	       "</div>" +
               "<div class='information'>" +
	       "<div class='max_guest'>" +
	       "<i class='fa fa-users fa-3x' aria-hidden='true'></i>" +
               "<br />" +
               place.max_guest +" Guests"+
               "</div>" +
	       "<div class='number_rooms'>" +
	       "<i class='fa fa-bed fa-3x' aria-hidden='true'></i>" +
               "<br />" +
               place.number_rooms + " Bedrooms"+
	       "</div>" +
	       "<div class='number_bathrooms'>" +
               "<i class='fa fa-bath fa-3x' aria-hidden='true'></i>" +
	       "<br />" +
               place.number_bathrooms +" Bathroom"+
               "</div>" +
	       "</div>" +
               "<div class='description'>" +
               place.description +
               "</div>" +
	       "</article>" 
             );
 
         }
}


});
