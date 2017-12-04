(function(){
	$(".mark-pic").html("");
	$(".lunbo img").click(function(){
		var txt = "";
		var len = 0;
		$(".mark").show();
		var that = $(this);
		len = that.next().find("span").length;
		console.log(len);
		for(var i=0;i<len;i++){
			(function(i){
				var t = that.next().find("span").eq(i).text();
				txt += "<img src="+t+" />";
			})(i)
		}
		$(".mark-pic").append(txt);
		$(".mark-pic img").eq(0).show();
		var ind = 0;
		$(".mark-right").click(function(){
			ind++;
			if(ind>len-1){ind = 0}
			$(".mark-pic img").eq(ind).show().siblings().hide();
		})
		$(".mark-left").click(function(){
			ind--;
			if(ind<0){ind = len-1}
			$(".mark-pic img").eq(ind).show().siblings().hide();
		})
	})
	$(".markbg").click(function(){
		$(".mark").hide();
		txt = "";
		// ind = 0;
		len = 0;
		$(".mark-pic").html("");
	})
})()