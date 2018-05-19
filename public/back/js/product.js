$(function(){
  
  var currentPage=1;
  var pageSize=5;
  
  render();
  function render() {
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('productTpl',info));
        
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked(a,b,c,page){
            currentPage=page;
            render();
          },
          itemTexts(type , page, current ){
            switch (type){
              case 'first': return '首页';
              case 'last': return '尾页';
              case 'prev': return '上一页';
              case 'next': return '下一页';
              case 'page': return page;
            }
          },
          tooltipTitles(type , page, current){
            switch (type){
              case 'first': return '首页';
              case 'last': return '尾页';
              case 'prev': return '上一页';
              case 'next': return '下一页';
              case 'page': return '前往第'+page+'页';
            }
          },
          //使用Bootstrap提供的标题样式
          useBootstrapTooltip:true
        })
      }
    })
  }
})