$('document').ready(function($){
	var header = $('header');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 105) {
			header.addClass("small");
		} else {
			header.removeClass("small");
		}
	});
});