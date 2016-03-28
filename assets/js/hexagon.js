function HexagonGrid(id, amount) {
	var $window = $(window);
	var hexCount = amount;
	var width = 180;
	var height = width + Math.round( width / 13 ) * 2;
	var TM = TweenMax;
	var gap = 10;
	var windowWidth = $window.width();
	var windowHeight = $window.height(); 
	var bigRowCount = Math.floor(windowWidth / width);
	var smallRowCount = bigRowCount - 1;
	var $hexagon = $('<div class="hexagon-container" ><div class="hexagon"><div class="hex-in"><div class="image"></div></div></div></div>');
	var $container = $(id);
	var hex = $container.find('.hexagon-container');
	var containerWidth = (bigRowCount != 1) ? (bigRowCount * width) + (gap * bigRowCount) : '100%';


	init();

	$window.on('resize', resizeStuff);

	function init() {
		setDefualtCSS();
		appendHexs();
		bigRow();
		smallRow();
	}

	function resizeStuff() {
		windowWidth = $window.width();
		windowHeight = $window.height(); 
		bigRowCount = Math.floor(windowWidth / width);
		smallRowCount = bigRowCount - 1;
		containerWidth = (bigRowCount != 1) ? (bigRowCount * width) + (gap * bigRowCount) : '100%';

		$container.width(containerWidth);

		$(hex).removeClass('big-row small-row').css({
			'margin-left' : '',
			'clear' : '',
			'margin-top' : (bigRowCount == 1) ? '10px' : '-40px'
		});

		bigRow();
		smallRow();
	}

	function randBetween(min, max) {
		return Math.round(Math.random() * (max - min))  + min;
	}

	function setDefualtCSS() {
		$container.width(containerWidth);

		$hexagon.css({
			width : width,
			height : height,
			marginRight: gap,
			marginTop : (bigRowCount == 1) ? '10px' : '-40px' 
		});

		$hexagon.find('.hexagon').css({
			top :  -1 * (width / 2) + 15,
			height : width * 2
		});
	}

	function appendHexs() {
		for(var i = 0; i < hexCount; i++) {
			var $hexaClone = $hexagon.clone();
			
			$container.append($hexaClone);

			$hexaClone.find('.image').css({ backgroundImage : 'url(assets/img/people/person' + i + '.jpg)' })

			hex = $('.hexagon-container');

			$(hex).each(function(i) {
				var randomDuration = randBetween(3, 10) * 0.1;
				var randomDelay = randBetween(1, 5) * 0.01;
				
				TM.to($(this), randomDuration, { scale : 1, delay: i * randomDelay });	
			});
		}
	}

	function bigRow() {
		// Big row
		for(var i = smallRowCount; i < hexCount; i += (bigRowCount + smallRowCount) ) {
			for(j = 0; j < bigRowCount; j++) {
				$(hex).eq(i + j).addClass('big-row');
			}

			$(hex).eq(	i).css({
				clear : 'both'
			});
		}
	}

	function smallRow() {
		// Small Row
		for(var i = 0; i < hexCount; i += (bigRowCount + smallRowCount) ) {
			for(j = 0; j < smallRowCount; j++) {
				$(hex).eq(i + j).addClass('small-row');
			}

			
			$(hex).eq(i).css({
				'margin-left' : (width / 2) + 5,
				'clear' : 'both'
			});
		}
	}
}
