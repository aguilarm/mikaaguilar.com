$('document').ready(function($){
	var header = $('header');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			header.addClass("small");
		} else {
			header.removeClass("small");
		}
	});
});