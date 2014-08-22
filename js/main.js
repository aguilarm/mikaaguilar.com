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
var $window = $(window);
	$slide = $('.homeSlide');
	$slideSkills = $('.homeSlideSkills');
	$slidePhoto = $('.homeSlidePhoto');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	$section = $('section');
	winH = $window.height();
	winW = $window.width();
	$socialSeparator = $('#socialSeparator');

	
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
	//Fix for 320 width devices to make the social icons a bit smaller
	if(winW<=320){
		$('#github, #linkedin').width(45).height(45).css("margin", ".5em");
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
			$slideSkills.height(winH-70);
	    	$slideTall.height(winH*2);
	    	$slideTall2.height(winH*3);
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

/* ==========================================================================
   Navigation Shrinker for Small Screens
   ========================================================================== */

	var header = document.getElementById('header');
	
	$(window).scroll(function () {
		if (($(this).scrollTop() > winH) && (winW < 768)) {
			header.style.position='fixed';
		} else if (($(this).scrollTop() < winH) && (winW < 768)) {
			header.style.position='static';
		}
	});

/* ==========================================================================
   Expanding skill card text on mobile
   ========================================================================== */
   $('.skillsCard').click(function (e) {
	   //update winW each click, and only run on small screen
	   winW = $(window).width();
	   if(winW <= 550) {
	   		var $skillsP = $(this).children('p');
	   		var $tapText = $(this).find('div.skillsTap>p');
	   		var $tapImg = $(this).find('div.skillsTap>img');
   				if ($skillsP.css('display') == 'none'){
					$skillsP.addClass('showSkills');
					$tapText.text('tap to hide');
					$tapImg.addClass('rotate');
					} else {
						$skillsP.removeClass('showSkills');
						$tapText.text('tap to expand');
						$tapImg.removeClass('rotate');
				}
   		}
   });
   
/* ==========================================================================
   Site Info Pull
   ========================================================================== */
	
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

/* ==========================================================================
   Form
   ========================================================================== */
   	
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

} )( jQuery );