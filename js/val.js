$(function () {
    // 初始化ajax参数,默认使用post方式同步提交
    koala.initAjax();
    // 关闭服务器log写入
    koala.loggeroff();
    // 设置日志参数, 包括服务器log写入URL,以及root level
    koala.setupLogger({
        URL: "http://localhost:8080/ssmdemo/logwriter",
        root: "INFO"
    });

    $.validate({
        // 统一设定触发验证的事件
        events: "change",
        // 统一设定验证失败的动作为弹出toast提示框
        error: function (msg) {
            var $this = $(this);
            $this.attr("title", msg);
            //$(this).css("border-color", "#FF0000");
            $K.toast({
                base: "body",
                message: msg,
                speed: 3000,
                callback: function () {
                    $this.focus();
                }
            });

        },
        success: function () {
            $(this).removeAttr("title");

        },
        // 定制验证类型
        validators: {
            required: "#username, #pwd, #comfirm-pwd, #email, #city",
            equalTo: {
                target: "#comfirm-pwd",
                equals: "#pwd"
            },
            email: {
                target: "#email"
            },
            format: {
                target: "#age, #birthday",
                format: "^[0-9]*$",
                message: "请输入正确的{0}"
            },
            birthday: {
                target: "#birthday",
                type: "range",
                range: "(0, 60)",
                message: "生日不能大于60"
            },
            age: {
                target: "#age",
                type: "range",
                range: "(0, 120)",
                message: "年龄超出范围,正确的范围是0~120之间"
            },
            dupliate: {
                target: "[dup]",
                message: "{0}重复, 请重新输入",
                // 设定这个验证的事件
                events: "blur",
                handler: function (value) {
                    var username;
                    logger.log("验证用户名" + value + "是否冲突....")
                    $.get($(this).attr("dup"), function (data) {
                        if (data) {
                            username = data.username;
                        }
                    })
                    return username != value;
                }
            }
        }

    });

    $("#btn").click(function () {
        var result = $("#t1 *").valResult();
        if (result.isOK == false) {
            result.trigger();
            return;
        }
        alert($("#t1 *").serialize());
    })

})
