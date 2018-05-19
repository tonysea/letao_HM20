$(function () {
  
  // var arr = [22, 33, 44, 55, 66]
  //
  // localStorage.setItem('search_list', JSON.stringify(arr));
  // var str = localStorage.getItem('search_list');
  
  // var arr1 = JSON.parse(str);
  // console.log(arr1);
  
  
  //封装获取本地数据数组的函数
  function getHistoryArr() {
    //  约定一个存取本地数据库的名字
    var history = localStorage.getItem('search_list') || '[]';
    // 将获取的字符串转换成数组
    var arr = JSON.parse(history);
    // console.log(arr);
    //
    return arr;
  }
  
  render();
  
  //渲染页面
  function render() {
    var arr = getHistoryArr();
    console.log(arr);
    //  将本地缓存的数据渲染到页面上
    $('.history').html(template('historyTpl', {arr: arr}));
  }
  
  
  // 清空全部历史数据
  $('.history .btn_remove').click(function () {
    
    mui.confirm('你确定要清除历史列表吗?', '温馨提示', ['取消', '确认'], function (e) {
      console.log(e);
      //点击确认时删除
      if (e.index === 1) {
        //清空本地缓存
        localStorage.removeItem('search_list');
        arr = [];
        //重新渲染页面
        render();
      }
    })
    
  })
  
  // 删除单条数据
  // 同样要清除缓存在本地的,数组里的
  $('.history .history_main').on('click', '.btn_delete', function () {
    //改变指向方法一
    // var that=this;
    mui.confirm('你确定要删除这条历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        
        //获取下标index 获取删除后的数组
        //this的指向变了,更改指向
        var index = $(this).data('index');
        arr = getHistoryArr();
        arr.splice(index, 1);
        console.log(arr);
        //通过数组跟新本地缓存
        localStorage.setItem('search_list', JSON.stringify(arr));
        //重新渲染页面
        render();
      }
      // 改变指向方法二
    }.bind(this))
  })
  
  var arr = [];
  //获取搜索历史数据,通过用户的输入添加
  $('.btn_search').click(function () {
    var txt = $('.inp input').val().trim();
    // console.log(txt);
    if (txt === '') {
      mui.toast='请输入关键字';
      return;
    }
    
    //删除重复的搜索项
    var index = arr.indexOf(txt);
    if( index > -1){
      arr.splice(index,1);
   }
    //删除大于10的项 ,先删再添加的所以=也ok
    if(arr.length >= 10 ){
      arr.pop();
    }
    //添加数据
    arr.unshift(txt);
    
    // console.log(arr);
    //持久化到本地
    localStorage.setItem('search_list', JSON.stringify(arr));
    //重新渲染
    render();
    
    $('.inp input').val('');
    location.href='searchList.html?key='+txt;
  })
  
  
})