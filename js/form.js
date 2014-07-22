$(function() {
	var form = $('#contactForm');
	var formMessage = $('#formMessage');

	$('#contactForm').submit(function(event) {
		event.preventDefault();
		var formData = $(form).serialize();
	
		$.ajax({
			url: $(form).attr('action'),
			type: 'POST',
			data: formData		
		}).done(function(response) {
			$(formMessage).removeClass('error');
			$(formMessage).addClass('success');
			$(formMessage).text(response);
	
			$('#name').val('');
   	 		$('#email').val('');
    		$('#message').val('');
		}).fail(function(data) {
			$(formMessage).removeClass('success');
    		$(formMessage).addClass('error');

    		if (data.responseText !== '') {
        		$(formMessage).text(data.responseText);
    		} else {
        		$(formMessage).text('Oops! An error occured and your message could not be sent.');
    		}
		});
	});
});