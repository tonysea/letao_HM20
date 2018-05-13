$(function () {
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  
  function render() {
    
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        //将模板的数据填充到页面上
        $('tbody').html(template('firstTpl', info));
        //分页插件 再调用ajax无限循环
        // $('#box').paging({
        //   initPageNo: 1, // 初始页码
        //   totalPages: Math.ceil(info.total/info.size), //总页数
        //   totalCount: '合计'+ info.total+'条数据', // 条目总数
        //   slideSpeed: 1000, // 缓动速度。单位毫秒
        //   jump:true,
        //   callback: function(page) { // 回调函数
        //
        //   },
        // })
        //  再调用ajax无限循环
        
        //教学分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
        
        
      }
    })
  }
  
  $('.addBtn').click(function () {
    $('#addModal').modal('show');
  })



//  验证输入框非空
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
            notEmpty:{
              message:'请输入分类名'
            }
        }
      }
    }
  })
  
  //校验成功事件
  $('#form').on('success.form.bv',function(e){
    
    e.preventDefault();
    //  添加一级分类
    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $('#form').serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          
            $('#addModal').modal('hide');
            currentPage = 1;
            render();
        }
      }
    })
    //重置表单
    $('#form').data('bootstrapValidator').resetForm(true);
  })
  
})