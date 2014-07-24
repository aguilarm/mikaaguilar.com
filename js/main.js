/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

/**
 * How to create a parallax scrolling website
 * Author: Petr Tichy
 * URL: www.ihatetomatoes.net
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website/
 */

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideShort = $('.homeSlideShort');
	$slidePhoto = $('.homeSlidePhoto');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	
	setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
			  $body.addClass('loaded');
			  
	}, 800);
	
	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
		    render: function(data) {
		    
		        //Debugging - Log the current scroll position.
		        //console.log(data.curTop);
		    }
		});
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
		$slideShort.height(winH*0.75);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
		$slidePhoto.height(winH*0.3);
	    
	    // Refresh Skrollr after resizing our sections
	    s.refresh($('.homeSlide'));
	    
		skrollr.menu.init(s, {
    //skrollr will smoothly animate to the new position using `animateTo`.
    animate: true,

    //The easing function to use.
    easing: 'sqrt',

    //Multiply your data-[offset] values so they match those set in skrollr.init
    scale: 2,

    //How long the animation should take in ms.
    duration: function(currentTop, targetTop) {
        //By default, the duration is hardcoded at 500ms.
        return 800;

        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
        //return Math.abs(currentTop - targetTop) * 200;
    },

    //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
    //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
    //handleLink: function(link) {
    //    return 400;//Hardcoding 400 doesn't make much sense.
    //}
});
	}
	
} )( jQuery );

/* ==========================================================================
   Navigation Shrinker
   ========================================================================== */

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

/* ==========================================================================
   Lightbox
   ========================================================================== */

$('document').ready(function($){
	
	var lightbox = $('#lightbox');
	
	$('.lightboxTrigger').click(function(e) {
		e.preventDefault();
		if (lightbox.css('display')=='none') {
			lightbox.css('display','table');
			console.log('LIGHT!');
		} else {
			lightbox.hide();
			console.log('DARK!');
		}
	});
	
	lightbox.click(function() {
		lightbox.hide();
		console.log('WE CLICKED THE LIGHT OFF');
	});
});

/* ==========================================================================
   Bounce
   ========================================================================== */
   
$('document').ready(function($){
	
	setInterval(function() {
		var element = $('#scrollDown');
		var distance = '28px';
		var speed = 800;
			
		element.animate({marginTop: '-='+distance},speed)
        	.animate({marginTop: '+='+distance},speed);
	}, 300)
});