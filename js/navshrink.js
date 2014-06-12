$(document).on("scroll",function(){
	if($(document).scrollTop()>80){
		$("header").switchClass("large","small",300,"linear");
	} else{
		$("header").switchClass("small","large",300,"linear");
	}
});