$(function(){
  
  // 获取产品id(还有封装的函数)
  var str=location.search;
  arr = str.split('=');
  var id = arr[1];

  
  render();
  function render(){
    $.ajax({
      url:'/product/queryProductDetail',
      type:'get',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $('.lt_main .mui-scroll').html(template('productTpl',info));
      // 手动初始化轮播图
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
  
  
        //  手动初始化数量框
        mui('.mui-numbox').numbox()
      }
    })
  }
  
  $('.lt_main').on('click','.lt_size span' ,function(){
    // console.log(this);
    $(this).addClass('active').siblings().removeClass('active');
  })
  
  
  $('.btn_addCart').click(function(){
    
    //获取用户选择的尺码
    var size = $('.lt_size span.active').text();
    console.log(size);
    // 获取用户购买的数量
    var num = $('.lt_num input').val();
    console.log(num);
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    // 添加选择的商品到购物车中
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function (data) {
        console.log(data);
        // 如果登录了，添加成功,跳转到购物车页面
        if(data.success){
          mui.confirm("添加成功","温馨提示",["去购物车", "继续浏览"], function (e) {
            if(e.index == 0){
              location.href = "cart.html";
            }
          });
        }
        //如果没登录，添加失败
        if(data.error == 400){
          //说明没登录,跳转到登录页面, 把当前页的地址传递到了登录页面。
          location.href = "login.html?retUrl="+location.href;
        }
      }
    });
  
  })
})