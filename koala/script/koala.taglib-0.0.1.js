/**
* 基于JQuery的自定义标签库, 可扩展
* By Junnyblue, 2018-8-22
*/
;
(function($) {
	var profix = koala().name;
	var tags = $.tags = {
		hello : {
			setup : function() {
				var name = $(this).attr("name") || "";
				$(this).replaceWith($("<DIV>").html("hello~" + name + "!"));

			}
		},
		header : {
			setup : function(e) {
				var hdiv = $("<DIV>").addClass("header").attr("id", "header").append($("<SPAN>").addClass("title").html(e.text()));
				var close_btn = e.attr("close-btn");
				if (close_btn && close_btn.toLowerCase() == "yes") {
					$("<A>").attr("href", "#").html("&times;").addClass("closeBtn").attr("id", "close").appendTo(hdiv);
				}
				e.replaceWith(hdiv);
			}
		},
		triangle : {
			setup : function(e) {
				var c = e.parent();
				var p = e.attr("position");
				($("<DIV>").addClass("triangle-" + p + "-btn").text(e.text()).appendTo(c)) && (e.text(""));
				$("<DIV>").addClass("triangle-" + p).appendTo(c).on({
					mouseover : function() {
						$(this).css({
							"border-bottom-color" : "#b2bfc4"
						});
					},
					mouseout : function() {
						$(this).css({
							"border-bottom-color" : "#e2dedc"
						});
						$(".triangle-bottomright-small").css({
							"border-bottom-color" : "#b2bfc4"
						});
						$(".triangle-bottomright-btn").css({
							"color" : "#e2dedc"
						});
					},
					mousedown : function() {
						$(this).css({
							"border-bottom-color" : "#6e90ae"
						});
						$(".triangle-bottomright-small").css({
							"border-bottom-color" : "#6e90ae"
						});
						$(".triangle-bottomright-btn").css({
							"color" : "#FFFFFF"
						});
					},
					mouseup : function() {
						$(this).css({
							"border-bottom-color" : "#b2bfc4"
						});
						$(".triangle-bottomright-small").css({
							"border-bottom-color" : "#b2bfc4"
						});
						$(".triangle-bottomright-btn").css({
							"color" : "#e2dedc"
						});
					}
				});
				$("<DIV>").addClass("triangle-" + p + "-small").appendTo(c);
				e.remove();

			}
		}
	};

	$.extend({
		setupTags : function(config) {
            var ts = $.extend(true, tags, config);
			for (tag in ts) {
				var elem = $(profix + "\\:" + tag);
				var setup = tags[tag].setup;
				if (koala.isExists(elem)) {
					elem.each(function(index, e) {
						setup.call(e, $(e));
					});

				}
			}
		}
	});
})(jQuery);