$(function () {
  
  var currentPage = 1;
  var pageSize = 2;

//   //解析地址栏参数,将关键字赋值到搜索框中
//   //获取地址栏 = 后的字符
  var key = getSearch('key');
  $('.inp input').val(key);
  
  
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //下拉刷新的回调,执行渲染页面
        callback: function () {
          //再次下拉刷新时重置页面为第一页
          currentPage=1;
          render(function (info) {
            /*下拉刷新是将数据覆盖*/
            $('.main_product ul').html(template('productTpl', info));
            
            // 渲染成功,关闭正在刷新...
            //bug 文档未更新endPulldownToRefresh()
            //mui('.mui-scroll-wrapper').pullRefresh()创建实例
            console.log(mui('.mui-scroll-wrapper').pullRefresh());
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          })
          
        }
      },
      up: {
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          console.log(currentPage);
          currentPage++;
          
          //   不能直接调用渲染,会覆盖
          render(function (info) {
            console.log(info);
            
            if (info.data.length > 0) {
              $('.main_product ul').append(template('productTpl', info));
              //true没有更多商品了
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            } else {
              // 没有数据时不需要追加是提醒用户没有更多数据了(true)
              
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }
            
            
          })
        }
      }
    }
  });
  
  
  function render(refresh) {
    
    var product = {};
    //获取商品名称
    product.proName = $('.inp input').val();
    
    product.page = currentPage;
    product.pageSize = pageSize;
    
    
    //获取所有带有active类的a
    var $current = $('.lt_sort a.active ');
    if ($current.length > 0) {
      //如果有高亮的元素,就进行排序
      //获取当下有active类的元素
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass("fa-angle-down") ? 2 : 1;
      product[sortName] = sortValue;
    }
    
    //模拟网络延迟
    
    //添加参数(渲染的函数 refresh ))
    setTimeout(function () {
      //渲染商品页面
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: product,
        success: function (info) {
          // console.log(info);
          
          refresh(info);
        }
      })
    }, 500)
  }
  
  
  //  点击搜索按钮渲染
  $('.btn_search').click(function () {
    
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    
    //  将搜索的关键字存储到历史记录中
    //  获取关键字
    var key = $('.inp input').val();
    //  获取数组
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    
    //  删除重复的
    var index = arr.indexOf(key);
    if (index > -1) {
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    //  同步到本地
    localStorage.setItem("search_list", JSON.stringify(arr));
    
    
  })

//  排序 更改样式
  $('.lt_sort a[data-type]').click(function () {
    if ($(this).hasClass('active')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      $(this).addClass('active').siblings().removeClass('active');
      
      $(this).siblings().find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    
    render();
  })
  
  
})




