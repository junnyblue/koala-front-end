$(function () {
    $("<input>").data("title", "邮箱").attr("id", "t1").appendValidation("email").appendValidation("required").appendValidation({
        type: "sp",
        handler: function (value) {
            return value != "tom@163.com";
        },
        message: "这个{0}不可用"

    }).appendTo("#container");



});
