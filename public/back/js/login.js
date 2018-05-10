$(function(){
	// console.log($('#form'));
	$('#form').bootstrapValidator({
		// valid 有效的
		//invalid 无效的
		// validating 验证 
		feedbackIcons:{
			valid: 'glyphicon glyphicon-ok',
		    invalid: 'glyphicon glyphicon-remove',
		    validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			username:{
				validators:{
					notEmpty:{
						message:'用户名不能为空'
					},
					stringLength:{
						min:2,
						max:6,
						message:'用户名长度为2-6位'
					},
					callback:{
                        message:'用户名不存在'
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:'密码不能为空'
					},
					stringLength:{
						min:5,
						max:12,
						message:'密码长度为5-12位'
					},
					callback:{
                        message:'密码错误'
					}
				}
			}
		}
	})

	// 默认是submit提交的,我们需要ajax提交
	// 表单校验成功触发的事件 此时用来阻止浏览器默认行为(submit提交)
    $('#form').on('success.form.bv',function(e){
    	//单词释义  阻止 默认系统默认值
          e.preventDefault()
          console.log($('#form').serialize());
			$.ajax({
				url:'/employee/employeeLogin',
				type:'post',
				data:$('#form').serialize(),
				dataType:'json',
				success:function(info){
                   console.log(info);
                   if(info.error===1000){
                   	//在此情况下执行更新字段值
                   	 // $("#form").data('bootstrapValidator')实例表单
                        $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
                   }
                   if(info.error===1001){
                   	$('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                   }
                   if(info.success){
                   	setTimeout(function(){
                   		location.href='index.html'
                   	},500)
                   		
                   }
				}
			})
    })

    $('.btn-cancel').click(function(){
    	// alert(1);
    	// 不添加true只能重置图标字体
    	//重置表单
    	 $("#form").data('bootstrapValidator').resetForm(true);
    })    
})
