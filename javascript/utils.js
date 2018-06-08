$(document).ready(function(){
	$('.middle_floating_menu ul.fbox_container li .box').off().click(function(){
		var loc = $(this).attr('data-link');
		window.location.href = loc;
	});
	
	$('.middle_floating_menu ul.fbox_container li .box').hover(function(){
		$(this).find('img').addClass('expand');
	},function(){
		$('.middle_floating_menu ul.fbox_container li .box img').removeClass('expand');
	});
});


