$(function() {
	var $window = $(window),
		$doc = $(document),
		$html = $('html'),
		$body = $('body'),	
		$container = $('#container');
		
	$doc.on('keydown', function(event) {
		if (event.which == 32) {
			$window.trigger('advance');
		};
	});
	
	$window.on('advance', function() {
		var $frame = $container.find('.frame'),
			$current = $container.find('.current'),
			$next = $frame.eq($current.index() + 1);
			
		if ($current.hasClass('final'))
			return;
		
			
		if (Modernizr.csstransitions) {
			$current.removeClass('current').addClass('spent');
			$next.addClass('current');
		}
	});
});