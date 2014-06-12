$(document).on("scroll",function(){
	if($(document).scrollTop()>100){
		$("header").switchClass("large","small",0);
		console.log('large to small');
	} else {
		$("header").switchClass("small","large",0);
		console.log('small to large');
	}
});