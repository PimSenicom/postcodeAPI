// Laat het volledige adres zien in een regel

jQuery("#adresVelden").css('display','none');
jQuery("#volledigAdres").css('display', 'none');

jQuery(document).on('change keyup','#PostcodeKolom input, #HuisnummerKolom input',function(){
    var postcode = jQuery('#PostcodeKolom input').val();
    var number = jQuery('#HuisnummerKolom input').val();
    
    // console.log(postcode + number);

    // if(jQuery( "#postcodeInvoer" ).validate().element('#PostcodeKolom input') && jQuery( "#postcodeInvoer" ).validate().element('#HuisnummerKolom input' )){
        
        jQuery.ajax({
            url: 'https://actie.seniorenvoordeelpas.nl/postcode_check.php',
            type: 'POST',
            data: "postcode="+postcode+'&number='+number,
            
            
            success: function (result) {
                var data = JSON.parse( result );
                
                

                if(data.adres !=''){
                    jQuery("#volledigAdres").html(data.adres);
                    jQuery("#volledigAdres").css('color','orange');
                    jQuery("#StraatnaamKolom .straatnaam").val(data.straatnaam);
                    jQuery("#PlaatsKolom .plaats").val(data.woonplaats);

                    jQuery("#volledigAdres").css('display','block');
                    
                    // console.log(data);
                
                }

                else{
                    jQuery("#volledigAdres").html('Adres niet gevonden');
                    jQuery("#volledigAdres").css('color','black');
                    jQuery("#StraatnaamKolom .straatnaam").val('');
                    jQuery("#PlaatsKolom .plaats").val('');

                    jQuery("#volledigAdres").css('display','block');
                    
                   // console.log("Fail");
                }
            }
        });
    // }
});