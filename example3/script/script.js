$(function () {
    //    $("<input>").data("title", "邮箱").attr("id", "t1").appendValidation("email").appendValidation("required").appendValidation({
    //        type: "sp",
    //        handler: function (value) {
    //            return value != "tom@163.com";
    //        },
    //        message: "这个{0}不可用"
    //
    //    }).appendTo("#container");
    $.validationSetup({
        error: function (msg) {
            alert(msg);
            $(this).focus();
        }
    });

    $("#username").appendValidation("required");

    $("#phonenum").appendValidation("required").appendValidation("digits");

    $("#addBtn").click(function () {
        var result = $(".info input").valResult();
        if (result.isOK) {
            var $tr = $("<tr></tr>").appendTo("#phoneTable");
            $("<td></td>").html($("#username").val()).appendTo($tr);
            $("<td></td>").html($("#phonenum").val()).appendTo($tr);
            $("<td></td>").append($("<input type='button' value='删除'>").click(function () {
                if (window.confirm("确定么?")) {
                    $(this).parent().parent().remove();
                }
            })).append($("<input type='button' value='修改'>").click(function () {
                if ($(this).val() == '修改') {
                    $(this).val("确定");
                    $(this).parent().parent().find("td:first, td:eq(1)").each(function () {
                        var value = $(this).html();
                        $(this).html("");
                        $("<input type='text' >").val(value).css("width", Math.max(5, value.length) + "em").appendValidation("required").appendTo($(this));
                    });
                } else {
                    var r = $(this).parent().parent().find("input").valResult();
                    if (r.isOK) {
                        $(this).val("修改");
                        $(this).parent().parent().find("td:first, td:eq(1)").each(function () {
                            var value = $(this).find("input").val();
                            $(this).empty();
                            $(this).html(value);
                        });
                    }
                }
            })).appendTo($tr);
            
            $("#username").val("");
            $("#phonenum").val("")
        }

    });

});
