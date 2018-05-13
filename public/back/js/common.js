	    
    
	// 进入页面检测登录过否
	
	// console.log(location.href.indexOf('login.html'));
	// 登录成功就会直接跳转不会走这边,
	// 未登录过走这边比较
	 if(location.href.indexOf('login.html')===-1){
		$.ajax({
			url:'/employee/checkRootLogin',
			type:'get',
			dataType:'json',
			success:function(info){
			
				console.log(info);
				if(info.error===400){
					 location.href='login.html'
				}
			}
		})
    }

   // 去除圆圈
    NProgress.configure({ showSpinner: false });

    $(document).ajaxStart(function () {
	      NProgress.start();
	      // console.log(1);
	}); 
     $(document).ajaxStop(function () {
     	setTimeout(function(){
     		NProgress.done();
     	},1000)
     	// console.log(2);
		  
	});
$(function(){
	$('.list_fade').click(function(){
		// alert(1)
		// $('.list_son').slideDown();
		$('.list_son').stop().slideToggle();
	})

	$('.main .menu').click(function(){
		// alert(1);
		$('.aside').toggleClass('active');

		$('.main_top').toggleClass('active');
		$('.main').toggleClass('active');
	})
    $('.sign_out').click(function(){
    	$('#logoutModal').modal("show");
    })
	$('.modalOut').click(function(){

		 $.ajax({
	    	url:'/employee/employeeLogout',
	    	type:'get',
	    	success:function(info){
	            console.log(info);
	            if(info.success){
	            	location.href='login.html'
	            }
	    	}
	       })
    })
    


   

})
