$(function() {
	var move = false;// 移动标记
	var _x, _y;// 鼠标离控件左上角的相对位置
	$("#header").mousedown(function(e) {
		move = true;
		_x = e.pageX - parseInt($(".drag").css("left"));
		_y = e.pageY - parseInt($(".drag").css("top"));
	});
	$(document).mousemove(function(e) {
		if (move) {
			var x = e.pageX - _x;// 控件左上角到屏幕左上角的相对位置
			var y = e.pageY - _y;
			var outerWidth = document.body.clientWidth;
			var outerHeight = document.body.clientHeight;
			var divWidth = $(".drag").outerWidth(true);
			var divHeight = $(".drag").outerHeight(true);
			$("#x").html(x);
			$("#y").html(y);
			$("#w").html($(".drag").outerWidth(true));
			$("#h").html($(".drag").outerHeight(true));
			// 不能将窗口移出浏览器窗口范围
			if (x >= 0 && y >= 0 && x < outerWidth - divWidth && y < outerHeight - divHeight) {
				$(".drag").css({
					"top" : y,
					"left" : x
				});
			}

		}
	}).mouseup(function() {
		move = false;
	});
});