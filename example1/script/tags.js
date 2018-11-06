$(function () {
    koala.initAjax();
    koala.setupTags({
        // 定义窗口头条
        header: function (e) {
            var hdiv = $("<DIV>").addClass("header").attr("id", "header").append($("<SPAN>").addClass("title").html(e.text()));
            var close_btn = e.attr("close-btn");
            if (close_btn && close_btn.toLowerCase() == "yes") {
                $("<A>").attr("href", "#").html("&times;").addClass("closeBtn").attr("id", "close").appendTo(hdiv);
            }
            
            return hdiv;
        },
        // 定义三角按钮
        triangle: function (e) {
            var c = e.parent();
            var p = e.attr("position");
            ($("<DIV>").addClass("triangle-" + p + "-btn").text(e.text()).appendTo(c)) && (e.text(""));
            $("<DIV>").addClass("triangle-" + p).appendTo(c).on({
                mouseover: function () {
                    $(this).css({
                        "border-bottom-color": "#b2bfc4"
                    });
                },
                mouseout: function () {
                    $(this).css({
                        "border-bottom-color": "#e2dedc"
                    });
                    $(".triangle-bottomright-small").css({
                        "border-bottom-color": "#b2bfc4"
                    });
                    $(".triangle-bottomright-btn").css({
                        "color": "#e2dedc"
                    });
                },
                mousedown: function () {
                    $(this).css({
                        "border-bottom-color": "#6e90ae"
                    });
                    $(".triangle-bottomright-small").css({
                        "border-bottom-color": "#6e90ae"
                    });
                    $(".triangle-bottomright-btn").css({
                        "color": "#FFFFFF"
                    });
                },
                mouseup: function () {
                    $(this).css({
                        "border-bottom-color": "#b2bfc4"
                    });
                    $(".triangle-bottomright-small").css({
                        "border-bottom-color": "#b2bfc4"
                    });
                    $(".triangle-bottomright-btn").css({
                        "color": "#e2dedc"
                    });
                }
            });
            $("<DIV>").addClass("triangle-" + p + "-small").appendTo(c);
            e.remove();

        }

    });
    
});
