$( document ).ready(function() {
    console.log( "ready!" );
    amenities = {}
    
    $('input').change(function() {
      console.log('changed');
      if($(this).prop("checked")) {
        amenities[$(this).attr("data-id")] = $(this).attr("data-name");
      }else{
        delete amenities[$(this).attr("data-id")]
      }
      console.log(amenities);
      $('.amenities h4').text("");
      for (key in amenities) {
        $('.amenities h4').append(amenities[key] + ', ');
      }
     
    });
});
