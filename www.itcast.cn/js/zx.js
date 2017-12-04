//通用咨询
$(".zx li").mouseenter(function(){
	$(this).children("div").show();
})
$(".zx li").mouseleave(function(){
	$(this).children("div").stop().hide();
})	
$(window).scroll(function(){
	var A = $(window).scrollTop();

	if(A > 400){
		$("#back").css("visibility","visible");
	}else{
		$("#back").css("visibility","hidden");
	}
});
$("#back").click(function(){
	$("html,body").animate(
		{
			"scrollTop":0
		},500
	);	
})
//底部社交二维码
$(".ewmbox").mouseenter(function(){
	$(this).children(".ewm").show().parent().siblings().children(".ewm").hide();
})
$(".ewmbox").mouseleave(function(){
	$(".ewmbox").children(".ewm").hide();
})	