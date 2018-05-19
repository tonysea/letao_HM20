$(function(){
  
  render();
  function render(){
    $.ajax({
      url:'/cart/queryCart',
      type:'GET',
       success:function(info){
         console.log(info);
         $('.mui-scroll').html(template('cartTpl',{list:info}));
       }
    })
  }
  
  
})