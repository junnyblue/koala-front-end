$(function () {
    $(".triangle-bottomright").on({
        click: function () {
            $("#btn").click();
        }
    });
    // 设置重置表单数据功能
    $("#reset").click(function () {
        $("#form1 *").reset({
            // empty : false,
            handler: function (elem) {
                $(elem).css("border-color", "rgb(180,180,180)");
                switch (elem.id) {
                    case "c1":
                        elem.checked = true;
                        $(elem).change();
                        break;
                    case "t1":
                        $(elem).html("");
                        break;
                    default:
                        $(elem).alive();
                }

            }
        });
    });

    $("#ignore").click(function () {
        $("div#body *").ignore();
    });

    $("#t1").ignore();

    $("#btn").click(function () {
        var json = $("#form1").serialize();
        alert(json);
        $("#close").click();
    });

    $("#c1").change(function () {
        var isChecked = $(this).prop("checked");
        if (isChecked) {
            $("#t1").reset().attr("disabled", true);
            $("#t1").val("");
            $("#t1").ignore();
        } else {
            $('#t1').removeAttr("disabled");
            $("#t1").alive();
        }
    });
    // 注册按钮功能，弹出浮动窗口
    $("#reg").click(function () {
        var div_obj = $(".drag");
        var windowWidth = document.body.clientWidth;
        var windowHeight = document.body.clientHeight;
        var popupHeight = div_obj.height();
        var popupWidth = div_obj.width();
        $("<div id='mask'></div>").addClass("mask").width(windowWidth).height(windowHeight).click(function () {
            $("#close").click();
        }).appendTo("body").fadeIn(200);
        div_obj.css({
            "position": "absolute"
        }).animate({
            left: windowWidth / 2 - popupWidth / 2,
            top: windowHeight / 2 - popupHeight / 2,
            opacity: "show"
        }, "slow", function () {
            $("#username").focus();
        });

    });

    // 关闭窗口按钮功能
    $("#close").click(function () {
        $(".drag").animate({
            opacity: "hide"
        }, "slow", null, function () {
            $("#mask").remove();
            $("#reset").click();
        });

    });
    $("#reset").click();
})
