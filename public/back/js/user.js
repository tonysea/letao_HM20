$(function(){
  
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('userTpl',info));
        
      //  分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
          
        })
      }
    })
  }
  var isDelete;
 $('tbody').on('click','.btn',function(){
   $('#updataModal').modal('show');
    isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
    console.log(isDelete);
    id=$(this).parent().data('id');
 })
  $('.confirm').click(function(){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        console.log(info);
        if(info.success){
          $('#updataModal').modal('hide');
          render();
        }
      }
    })
  })
})