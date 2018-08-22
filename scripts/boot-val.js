$(function() {
	// 启动验证框架
	$.validate({
		error : function(name, container, type, message) {
			message = koala.format(message, name)
			$().toastmessage({
				position : 'middle-center',
			});

			$().toastmessage("showWarningToast", message);

		},
		validators : {
			password : {
				type : "cascade-validate",
				// 验证对象
				target : "#pwd",
				// 配置级联操作的对象
				cascade : "#comfirm-pwd",
				// 级联操作会触发reset操作，这里设定reset操作的参数
				cascade_handler : {
					empty : false, // 是否清空控件的值
					handler : function() { // 级联控件的后续操作
						if ($(this).val()) {
							$(this).validate("equalTo");
						}
					}
				}
			},
			deleg : {
				target : "[name='habit']",
				// 将爱好checkbox的验证统一委派给div#habits
				// 注意：设定了委派对象，则一切方法的this对象统一变成委派对象
				delegate : "#habits",
				handler : function(value) {
					return value.len >= $(this).attr("min-num");
				},
				getValue : function() {
					return {
						len : $(this).find("input:checked").length
					};
				},
				message : "请选择不少于{min}个{name}",
				getMessageParameters : function() {
					return {
						name : $(this).getLabel(),
						min : $(this).attr("min-num")
					}
				}
			}

		}

	});
	// 初始化时忽略备注的验证
	$("#t1").ignore();
	$("#c1").change(function() {
		var isChecked = $(this).attr("checked");
		if (isChecked) {
			$("#t1").reset().attr("disabled", true);
			$("#t1").val("");
			$("#t1").ignore();
		} else {
			$('#t1').removeAttr("disabled");
			$("#t1").alive();
		}
	});
	$("#testForm").submit(function() {
		return $(this).validate();
	});
});