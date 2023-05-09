jQuery(document).ready(function () {


        jQuery('.menu').click(function () {
            jQuery('html').toggleClass('show-menu');
        });
        jQuery('.close-button').click(function () {
            jQuery('html').removeClass('show-menu');
        });
        jQuery(".menu-act ul li a").each(function () {
            var pathname1 = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
            var pathname = pathname1.replace("#/", "");
            if (jQuery(this).attr('href') == pathname) {
                jQuery(this).parent().addClass('active');
            }
        });

        /**/
		jQuery(window).scroll(function () {
				var sticky = jQuery('#header'),
					scroll = jQuery(window).scrollTop();
				if (scroll >= 80) sticky.addClass('fixed');
				else sticky.removeClass('fixed');
			});
		});

        /* */
        // hide #back-top first
        jQuery("#myBtn").hide();
        // fade in #back-top
        jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('#myBtn').fadeIn();
            } else {
                jQuery('#myBtn').fadeOut();
            }
        });
        // scroll body to 0px on click
        jQuery('#myBtn').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

        /*input focus*/
        jQuery(document).ready(function () {
			function updateText(event) {
				var input = jQuery(this);
				setTimeout(function () {
					var val = input.val();
					if (val != "")
						input.parent().addClass("value_focus");
					else
						input.parent().removeClass("value_focus");
				}, 1)
			}
			jQuery("form .form-field input, textarea, .subscribe .email").keydown(updateText);
			jQuery("form .form-field input, textarea, .subscribe .email").change(updateText);
			var input1 = jQuery("form .form-field input, textarea, .subscribe .email");
			jQuery("form .form-field input, textarea, .subscribe .email").each(function () {
				var input = jQuery(this);
				setTimeout(function () {
					var val = input.val();
					if (val != "")
						input.parent().addClass("value_focus");
					else
						input.parent().removeClass("value_focus");
				}, 1)
			});
			input1.focusin(function () {
				jQuery(this).parent().addClass("input_focus");
			});
			input1.focusout(function () {
				jQuery(this).parent().removeClass("input_focus");
			});
			function updateText(event) {
				var input = jQuery(this);
				setTimeout(function () {
					var val = input.val();
					if (val != "")
						input.parent().addClass("value_focus");
					else
						input.parent().removeClass("value_focus");
				}, 1)
			}
			jQuery("form .form-field textarea, .subscribe .email").keydown(updateText);
			jQuery("form .form-field textarea, .subscribe .email").change(updateText);
			var input1 = jQuery("form .form-field textarea, .subscribe .email");
			jQuery("form .form-field textarea, .subscribe .email").each(function () {
				var input = jQuery(this);
				setTimeout(function () {
					var val = input.val();
					if (val != "")
						input.parent().addClass("value_focus");
					else
						input.parent().removeClass("value_focus");
				}, 1)
			});
			input1.focusin(function () {
				jQuery(this).parent().addClass("input_focus");
			});
			input1.focusout(function () {
				jQuery(this).parent().removeClass("input_focus");
			});
		});

		jQuery('.temoignages-wrap').owlCarousel({
			loop:true,
			margin:27,
			nav:true,
			dots: true,
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				768:{
					items:2,
					margin:15
				},
				1024:{
					items:3
				}
			}
		});

});