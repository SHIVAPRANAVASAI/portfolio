
// JavaScript contact form Document
$(document).ready(function() {
	$('form#main_contact_form').submit(function(e) {
	e.preventDefault();
	$('form#main_contact_form .error').remove();
	var hasError = false;
	$('.requiredField').each(function() {
	if(jQuery.trim($(this).val()) == '') {
    var labelText = $(this).prev('label').text();
    $(this).parent().append('<span class="error">You forgot to enter your '+labelText+'</span>');
    $(this).addClass('inputError');
    hasError = true;
    } else if($(this).hasClass('email')) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test(jQuery.trim($(this).val()))) {
    var labelText = $(this).prev('label').text();
    $(this).parent().append('<span class="error">You entered an invalid '+labelText+'</span>');
    $(this).addClass('inputError');
    hasError = true;
    }
    }
    });
    if(!hasError) {
    $('form#main_contact_form input[type="submit"], form#main_contact_form button[type="submit"]').fadeOut('normal', function() {
    $(this).parent().append('');
    });

     $("#loader").show();
        $.ajax({
            url: "contact.php",
            type: "POST",
            data:  new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
			  $('form#main_contact_form').slideUp("fast", function() {
			  $(this).before('<div class="success">Thank you. Your Email was sent successfully.</div>');
			  $("#loader").hide();
			  })
            },
            error: function() {
              $("#loader").hide();
              $('form#main_contact_form').before('<div class="error">Sorry, there was an error sending your message. Please try again.</div>');
            }           
       });
	   
	   return false;
    }
 
   });
});