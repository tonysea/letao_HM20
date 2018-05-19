//轮播图
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

//区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false , //是否显示滚动条
  // deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  // bounce: true //是否启用回弹 默认为true
});



function getSearch(key){
  //根据地址参数,获取搜索值,赋值给input框
  var txt = location.search;
  // 中文解码
  txt = decodeURI(txt);
  //qu去掉结果中的 ?
  txt = txt.slice(1);
  console.log(txt);
  
  //将字符串转换成对象
  //1.切割成数组
  var arr=txt.split('&');
  console.log(arr);
  //2.遍历数组,存入对象
  var obj={};
  arr.forEach(function(item,index){
    var k = item.split('=')[0];
    var v = item.split('=')[1];
    
    obj[k]=v;
  });
  
  return obj[key]
  
}