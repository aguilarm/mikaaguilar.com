/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

/**
 * How to create a parallax scrolling website
 * Author: Petr Tichy
 * URL: www.ihatetomatoes.net
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website/
 */
(function ($) {
	
//Setup Variables
var $window = $(window),
	$slide = $('.homeSlide'),
	$slidePhoto = $('.homeSlidePhoto'),
	$body = $('body'),
	winH = $window.height(),
	winW = $window.width();

	
    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  setTimeout(function() {
				  $('#linkedin, #github').css("transition", "background-image 1s");
			  }, 300);
			  
		}, 800);
	});

	
	
	//Nitpicking targeted restyling:
	
	//ALWAYS resize the height of top
	$('#top').height(winH);
	
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
			$slidePhoto.height(winH*0.4);
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