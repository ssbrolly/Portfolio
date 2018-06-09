var SliderController = new function(){
	var instance = this;

	var images = [{
		img:'./images/hdspace9.jpg',
		text:'write something fresh'
	},{
		img:'./images/hdspace5.jpg',
		text:'anything fresh'
	},{
		img:'./images/hdspace3.jpg',
		text:'more things fresh'
	}];

	var curIndex = images.length-1;
	var bgRemoverTimer = null;
	var fadeDuration = 1500;

	// auto rotation
	var autoRotationInterval = null;
	var autoRotationDelay = 7000;
	
	// preloading
	var imageCount = 0;
	
	// callout text
	var textRemoverTimer = null;

	this.init = function(){
		this.preloadImages();
	}
	this.preloadImages = function(){
		var loader = '<img class="loader animate" src="images/loading.gif"/>';
		$('.middle_callout').append(loader);
		
		for(var x=0;x<images.length;x++){
			var tmp = new Image();
			tmp.onload = function(){
				imageCount++;
				if(imageCount >= images.length){
					$('.middle_callout img.loader').css({
						'-ms-transform': 'scale(0,0)',
					    '-webkit-transform': 'scale(0,0)',
				    	'transform': 'scale(0,0)'
					});
					setTimeout(function(){
						$('.middle_callout img.loader').remove();
					},500);
					instance.loadBullets();
					instance.loadNextImage();
					instance.startAutoRotation();
					instance.addEventListeners();
				}
			}
			tmp.src = images[x].img;
		}
	}
	this.loadBullets = function(){
		for(var x=0;x<images.length;x++){
			$('.middle_callout ul.bullets').append('<li class="animate-slow"></li>');
		}
	}
	this.startAutoRotation = function(){
		autoRotationInterval = setInterval(function(){
			instance.loadNextImage();
		},autoRotationDelay);
	}
	this.stopAutoRotation = function(){
		clearInterval(autoRotationInterval);
		autoRotationInterval = null;
	}
	this.loadNextImage = function(){
		curIndex++;
		if(curIndex > images.length-1) curIndex = 0;
		this.loadImage(curIndex);
	}
	this.loadPrevImage = function(){
		curIndex--;
		if(curIndex < 0) curIndex = images.length-1;
		this.loadImage(curIndex);
	}
	this.loadImage = function(index){
		curIndex = index;
		$('.bg_slide li').addClass('remover').removeClass('inbound').stop();
		$('.bg_slide').append('<li class="inbound"><span></span></li>');
		
		clearTimeout(bgRemoverTimer);
		bgRemoverTimer = null;
		bgRemoverTimer = setTimeout(function(){
			$('.bg_slide li.remover').remove();
		},fadeDuration + 500);
		
		$('.bg_slide li.inbound span').css({
			'background-image':'url('+images[index].img+')'
		}).stop().animate(
			{opacity: 1},
			{queue: false, duration: fadeDuration, easing:'easeout'}
		);
		
		$('.middle_callout ul.bullets li').removeClass('selected');
		$($('.middle_callout ul.bullets li')[index]).addClass('selected');
		
		this.loadText(index);
	}
	this.loadText = function(index){
		$('.middle_callout .text').removeClass('current').addClass('remover');
		$('.middle_callout').append('<div class="text current boxsize"><em></em></div>');
		
		var animations_start = [/*{
			'-ms-transform': 'scale(0,0)',
		    '-webkit-transform': 'scale(0,0)',
	    	'transform': 'scale(0,0)'
		},{
			'opacity': 0
		},{
			'left':'40%'
		},{
			'left':'60%'
		},{
			'top':'40%'
		},{
			'top':'60%'
		},*/{
			'-ms-transform': 'scale(1.2,1.2)',
		    '-webkit-transform': 'scale(1.2,1.2)',
	    	'transform': 'scale(1.2,1.2)'
		}/*,{
			'-ms-transform': 'rotate(20deg)',
		    '-webkit-transform': 'rotate(20deg)',
	    	'transform': 'rotate(20deg)'
		},{
			'-ms-transform': 'rotate(-20deg)',
		    '-webkit-transform': 'rotate(-20deg)',
	    	'transform': 'rotate(-20deg)'
		}*/];
		var animations_end = [/*{
			'-ms-transform': 'scale(1,1)',
		    '-webkit-transform': 'scale(1,1)',
	    	'transform': 'scale(1,1)',
	    	'opacity': 1
		},{
			'opacity': 1
		},{
			'left':'50%',
			'opacity': 1
		},{
			'left':'50%',
			'opacity': 1
		},{
			'top':'50%',
			'opacity': 1
		},{
			'top':'50%',
			'opacity': 1
		},*/{
			'-ms-transform': 'scale(1,1)',
		    '-webkit-transform': 'scale(1,1)',
	    	'transform': 'scale(1,1)',
	    	'opacity': 1
		}/*,{
			'-ms-transform': 'rotate(0deg)',
		    '-webkit-transform': 'rotate(0deg)',
	    	'transform': 'rotate(0deg)',
	    	'opacity': 1
		},{
			'-ms-transform': 'rotate(0deg)',
		    '-webkit-transform': 'rotate(0deg)',
	    	'transform': 'rotate(0deg)',
	    	'opacity': 1
		}*/];
		
		var rand = Math.floor(Math.random()*animations_start.length);
		
		$('.middle_callout .text.current').html(images[index].text).css({
	    	//'margin-left':'-' + $('.middle_callout .text.current').width()/2 + 'px',
			'margin-top':'-' + ($('.middle_callout .text.current').height()/2 + 10) + 'px'
		}).css(animations_start[rand]);
		
		
		
		setTimeout(function(){
			$('.middle_callout .text.current').css(animations_end[rand]).addClass('animate-slow');
		},50);
		
		setTimeout(function(){
			$('.middle_callout .text.remover').css({
				'opacity':'0'
			});
		},10);
		
		
		clearTimeout(textRemoverTimer);
		textRemoverTimer = null;
		textRemoverTimer = setTimeout(function(){
			$('.middle_callout .text.remover').remove();
		},700);
	}

	this.addEventListeners = function(){
		
		$('.middle_callout img').off().click(function(){
			instance.stopAutoRotation();
			if($(this).hasClass('left')){
				instance.loadPrevImage();
			}else{
				instance.loadNextImage();
			}
			instance.startAutoRotation();
		});
		
		$('.middle_callout ul.bullets li').off().click(function(){
			instance.stopAutoRotation();
			var index = $('.middle_callout ul.bullets li').index(this);
			if(index!=curIndex)	instance.loadImage(index);
			instance.startAutoRotation();
		});
	}
	this.init();
}