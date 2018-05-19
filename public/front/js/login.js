$(function () {
  //确定按钮点击事件
  //获取用户名和密码
  
  $('.btn_confirm').click(function(){
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    if( username == ''){
      mui.toast('请输入用户名!');
      return;
    }
    if(password == ''){
      mui.toast('请输入密码!');
      return;
    }

    $.ajax({
      url:'/user/login',
      type:'post',
      data:{
        username:username,
        password:password
      },
      success:function(info){

        console.log(info);
        if(info.error===403){
          mui.toast('用户名或密码不存在!')
        }
        if(info.success){
          var str = location.search;
          console.log(str);
          // 从购物车页面跳转过来的
          if(str.indexOf('?retUrl') > -1){
            str = str.replace('?retUrl=','');
            console.log(str);
            location.href= str;
          }else {
            // location.href='member.html';
          }
          
        }
        
      }
    })
  })

  
})