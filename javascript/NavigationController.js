var NavigationController = new function(){
	var instance = this;

	this.init = function(){
		this.addEventListeners();
	}
	this.addEventListeners = function(){
		$('.header_top img.menuicon').click(function(){
			var isHidden = $('ul.nav').hasClass('hide');
			if(isHidden){
				$('ul.nav').removeClass('hide');
			}else{
				$('ul.nav').addClass('hide');
			}
		});
		
		this.showOverlay = function(){
			// not doing this.. not worth the effort.
			var ol = document.createElement('div');
			ol.style.position = 'fixed';
			ol.style.left = '0px';
			ol.style.top = '0px';
			ol.style.width = '100%';
			ol.style.height = '100%';
			ol.style.backgroundColor ='black';
			ol.style.opacity='0.5';
			ol.style.zIndex = '2';
			$('body').append(ol);
		}
		this.hidOverlay = function(){
			
		}
	}
	this.init();
}