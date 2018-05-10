$(function(){
	 var barChart = echarts.init(document.getElementById('bar'));
	  var option = {
            title: {
                text: '2017年注册人数',
                // subtext:"人数"
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [1000, 1500, 2500, 1200, 600, 1800]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        barChart.setOption(option);


    var pieChart = echarts.init(document.getElementById('pie'));
	   option = {
	    title : {
	        text: '热门品牌销售',
	        subtext: '2018年5月',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['耐克','阿迪','李宁','新百伦','阿迪王']
	    },
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'耐克'},
	                {value:310, name:'阿迪'},
	                {value:234, name:'李宁'},
	                {value:135, name:'新百伦'},
	                {value:1548, name:'阿迪王'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

   pieChart.setOption(option);
})
