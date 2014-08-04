/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

/**
 * How to create a parallax scrolling website
 * Author: Petr Tichy
 * URL: www.ihatetomatoes.net
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website/
 */
( function( $ ) {
	
	//Setup Variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideShort = $('.homeSlideShort');
	$slidePhoto = $('.homeSlidePhoto');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	$section = $('section');
	winH = $window.height();
	winW = $window.width();
	
    //FadeIn all sections   
	function loaded() {
		setTimeout(function() {
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	}
	
	loaded();
	

	//ALWAYS resize the height of top

	$('#top').height(winH);
	//If winH is lower than 600, adjust logo.  Fix for netbooks
	if(winH <= 600){
		$('#logoBig').css("margin-top", "-10px");
		$('#top').css("min-height", "640px");
	}
	//Fix for 320 width devices to show MIKA AGUILAR text on one line
	//Also make the social icons a bit smaller
	if(winW<=320){
		$('#top h1').css("font-size", "2.6em");
		$('#github, #linkedin').width(45).height(45).css("margin", ".5em");
		$('#logoBig').css("margin-top","-60px");
	}
	
	function adjustWindow(){

	    // Get window size
	    winH = $window.height();
	    winW = $window.width();

	    // Keep minimum height 550
	    if(winH <= 550) {
	        winH = 550;
	    }

	    // Init Skrollr for 768 and up
	    if( winW >= 768) {

	        // Init Skrollr
	        var s = skrollr.init({
	            forceHeight: false
	        });

	        // Resize our slides
	        $slide.height(winH);
			$slideShort.height(winH*0.75);
	    	$slideTall.height(winH*2);
	    	$slideTall2.height(winH*3);
			$slidePhoto.height(winH*0.3);
			//$section.css({'min-width': winW});
			
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
    			}
        			//But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
        			//return Math.abs(currentTop - targetTop) * 200;
    			});
	    } else {
			
			
	        // Init Skrollr
	        var s = skrollr.init();
	        s.destroy();
			
			
	    }

	}
	
	function initAdjustWindow() {
	    return {
	        match : function() {
	            adjustWindow();
	        },
	        unmatch : function() {
	            adjustWindow();
	        }
	    };
	}

	enquire.register("screen and (min-device-width : 768px)", initAdjustWindow(), false);
		
} )( jQuery );
		/*//Init Skrollr for 768+
		if( winW >= 768) {

	    	// Resize our slides
	    	$slide.height(winH);

	    
	    	// Refresh Skrollr after resizing our sections
	    	s.refresh($('.homeSlide'));
			
			//Activate menu plugin
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
			});*/

/* ==========================================================================
   Navigation Shrinker
   ========================================================================== */

$('document').ready(function($){
	var header = $('header');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			header.addClass("small");
		} else {
			header.removeClass("small");
		}
	});
});

/* ==========================================================================
   Site Info Pull
   ========================================================================== */

$('document').ready(function($){
	
	var info = $('#siteInfo');
	
	$('.infoTrigger').click(function(e) {
		e.preventDefault();
		if (info.css('display')=='none') {
			info.show(300);
			$('html, body').animate({scrollTop: info.offset().top}, 'slow');
		} else {
			info.hide(300);
		}
	});
	
	info.click(function() {
		info.hide(300);
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

/* ==========================================================================
   Form
   ========================================================================== */

$(function() {
	
	var form = $('#contactform');
	var formMessage = $('#formmessages');

	$(form).submit(function(e) {
		e.preventDefault();
		
		$(formMessage).addClass('loading');
		$(formMessage).removeClass('error');
		$(formMessage).removeClass('success');
		$(formMessage).text('Loading...');
		
		var formData = $(form).serialize();
	
		$.ajax({
			url: $(form).attr('action'),
			type: 'POST',
			data: formData		
		})
		.done(function(response) {
			
			$(formMessage).removeClass('loading');
			$(formMessage).removeClass('error');
			$(formMessage).addClass('success');
			
			$(formMessage).text(response);
	
			$('#name').val('');
   	 		$('#email').val('');
    		$('#message').val('');
		})
		.fail(function(data) {
			
			$(formMessage).removeClass('loading');
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