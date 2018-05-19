$(function(){
  
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false , //是否显示滚动条
    // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    // bounce: true //是否启用回弹 默认为true
  });
  
  
  asideRender();
  function asideRender(){
    $.ajax({
      url:'/category/queryTopCategory',
      type:'get',
      success:function(info){
        console.log(info);
        $('.aside ul').html(template('asideTpl',info));
        
        $('.aside li:first-child a').addClass('active');
        //默认
        bannerRender(  info.rows[0].id)
      }
    })
  }
  

    $('.aside').on('click','a',function(){
      var id = $(this).data('id');
      console.log(id);
      bannerRender(id);
      $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    })
  
      function bannerRender(id){
        $.ajax({
          url:'/category/querySecondCategory',
          type:'get',
          data:{
            id:id
          },
          success:function(info){
            console.log(info);
            $('.banner ul').html(template('bannerTpl',info));
          }
        })
      }

  
     //  点击跳转
    $('.header_right').click(function(){
       location.href='search.html'
    })
})