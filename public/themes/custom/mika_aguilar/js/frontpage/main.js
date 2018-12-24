(function ($) {
	
	//Setup Variables
	var $body = $('body');
	
    //FadeIn all sections
	$body.imagesLoaded( function() {
		$body.removeClass('loading').addClass('loaded');
	});

} )( jQuery );