$(function() {
	/* 全局参数设定, 启动验证框架 */
	$.validate({
        submit : "#btn",
		errorPlacement : "#toast",
		error : function(msg) {
			var $this = $(this);
			$this.attr("title", msg);
			koala.toast({
				base : $(".drag"),
				message : msg,
                top : function(baseHeight, toaseHeight){
                    return  baseHeight*3/4;
                    
                },
				callback : function() {
					$this.focus();
				}

			});
			$(this).css("border-color", "#FF0000");
		},
		success : function() {
			$(this).css("border-color", "rgb(180,180,180)").removeAttr("title");
		},
		/* 注册新的验证类型，如果和已有的属性相同将会合并 */
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
			forbid : {
				target : "#body :text",
				message : "这个{0}禁止使用",
				forbidden : ",admin,administrator,god,fuck,",
				handler : function(value, context) {
					value = value.trim(",").trim().toLowerCase();
					return !new RegExp("," + value + ",", "g").test(context.forbidden);
				}
			},
			nameRole : {
				target : "#username",
				message : "名字必须以字母开头",
				handler : function(value, c) {
					return !/^\d/.test(value);
				}
			},
			// 将爱好checkbox的验证统一委派给div#habits
			// 注意：设定了委派对象，则handler，getValue等方法的this对象统一变成委派对象
			deleg : {
				target : "[name='habit']",
				delegate : "#habits",
				handler : function(value) {
					return value.len >= $(this).attr("min-num");
				},
				getValue : function() {
					return {
						len : $(this).find("input:checked").length
					};
				},
				getMessageParameters : function() {
					return {
						name : $(this).getLabel(),
						min : $(this).attr("min-num")
					}
				}
			}

		},
		// 添加或修改默认错误提示信息
		messages : {
			required : "{0}是必填项",
			equalTo : "两次输入的{value}不一致",
			deleg : "至少要选择{min}个{name}"
		}
	});

});