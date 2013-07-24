$(function() {
	var $window = $(window),
		$doc = $(document),
		$html = $('html'),
		$body = $('body'),	
		$container = $('#container'),
		$music = new Audio();
		
	$doc.on('keydown', function(event) {
		if (event.which == 32) {
			$window.trigger('advance');
		};
	});
	
	$doc.on('touchstart', function(event) {
		$window.trigger('advance');
	});
	
	$window.on('advance', function() {
		var $frame = $container.find('.frame'),
			$current = $container.find('.current'),
			$next = $frame.eq($current.index() + 1);
			
		if ($current.hasClass('final'))
			return;
		
		if ($next.hasClass('start-music')) {
			if ($music.canPlayType('audio/mpeg;')) {
				$music.type= 'audio/mpeg';
				$music.src= '/music.mp3';
			} else {
				$music.type= 'audio/ogg';
				$music.src= '/music.ogg';
			}
			$music.volume = 0;
			$music.play();
			$($music).animate({volume: 1}, 2000);
		}

		if (Modernizr.csstransitions) {
			$current.removeClass('current').addClass('spent');
			$next.addClass('current');
		} else {
			if ($current.hasClass('slow-hack')) {
				$current.css({ opacity: 1 }).removeClass('current').animate({ opacity: 0 }, 1500);
			} else {
				$current.css({ opacity: 1 }).removeClass('current').animate({ opacity: 0 }, 500);
			}
			$next.css({ opacity: 0 }).addClass('current').animate({ opacity: 1 }, 1000);
		}
	});
});
