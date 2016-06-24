/*echarts pic学生拍题*/
var option_pic = {
    tooltip : {
        trigger: 'item'
    },
    grid: {
        left: '2%',
        right: '3%',
        bottom: '2%',
        top:'2%',
        containLabel: true
    },
    xAxis : 
        {
            type : 'category',
            boundaryGap : true,
            axisTick:{show:false},
            data : ['1','2','3','4','5','6','7','8','9','10','11','12'],
             splitLine:{ 
	            lineStyle:{
	               type:'dashed',
	               color:'#ededed'
	               
	            }
	        },
        },
     yAxis: {
        splitNumber:1,
        type: 'value',
        show:true,
        axisTick:{show:false},
        axisLine:{
            show:false,
        }
    },
    series : [   
        {
            name:'直接访问',
            type:'line',
            data:[32, 33, 1, 33, 40, 30, 20,2, 1, 33, 40, 30],
            lineStyle:{
                normal:{
                   color:"#61a0a8" 
                }
            }
        },
        {
            name:'搜索引擎',
            type:'line',
            data:[82, 93, 90, 93, 19, 133, 12, 90, 93, 19, 133, 12],
            lineStyle:{
                normal:{
                   color:"#c23531" 
                }
            }
        }
    ]
};

var chart_pic = echarts.init(document.getElementById('charts-pic'));
chart_pic.setOption(option_pic);

/*echarts 按题型结构分析*/
var option_preparation = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'选择题'},
		        {icon:'circle',name:'非选择题'}
		        ]
    },
    color:['#c23531','#38586d'],
    series: [
        {
            name:'访问来源',
            type:'pie',
            center: ['50%', '45%'],
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.8)'
                    },
                formatter: "{b}({d}%)"
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0.9)'
                    }
                }
            },
            data:[
                {value:3, name:'选择题'},
                {value:16, name:'非选择题'}
            ]
        }
    ]
};
var chart_preparation = echarts.init(document.getElementById('charts-preparation'));
chart_preparation.setOption(option_preparation);

/*echarts 按知识结构分析*/
var option_teaching_difficuty = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'知识1'},
		        {icon:'circle',name:'知识2'},
		        {icon:'circle',name:'知识3'},
		        {icon:'circle',name:'知识4'},
		        {icon:'circle',name:'知识5'}
		        ]
    },
    color:['#c23531', '#61a0a8','#38586d','#c4ccd3','#d48265'],
    series: [
        {
            name:'访问来源',
            type:'pie',
            center: ['50%', '45%'],
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.8)'
                    },
                formatter: "{b}({d}%)"
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0.9)'
                    }
                }
            },
            data:[
                {value:3, name:'知识1'},
                {value:4, name:'知识2'},
                {value:16, name:'知识3'},
                {value:16, name:'知识4'},
                {value:16, name:'知识5'}
            ]
        }
    ]
};
var chart_teaching_difficuty = echarts.init(document.getElementById('charts-teaching-difficuty'));
chart_teaching_difficuty.setOption(option_teaching_difficuty);

/*echarts 按错误类型分析*/
var option_teaching_idea= {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'高难度'},
		        {icon:'circle',name:'学习习惯'},
		        {icon:'circle',name:'知识未掌握'}
		        ]
    },
    color:['#c23531', '#61a0a8','#38586d'],
    series: [
        {
            name:'访问来源',
            type:'pie',
            center: ['50%', '45%'],
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.8)'
                    },
                formatter: "{b}({d}%)"
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0.9)'
                    }
                }
            },
            data:[
                {value:3, name:'高难度'},
                {value:16, name:'学习习惯'},
                {value:16, name:'知识未掌握'}
            ]
        }
    ]
};
var chart_teaching_idea= echarts.init(document.getElementById('charts-teaching-idea'));
chart_teaching_idea.setOption(option_teaching_idea);

$(function(){
	// 表头是否显示
	var isShow = false;
	//表格顶部距离顶部距离　＋　表头高度
	var v_min_len = $(".table-wrapper").offset().top +　($(".table-wrapper th").outerHeight())/2;
	var v_max_len = $(".table-wrapper").offset().top +　$(".table-wrapper tbody").outerHeight() - 5;
	
/*垂直监听*/
	 $(window).scroll(function () {
	 	v_scroll = document.body.scrollTop
            if(v_scroll > v_min_len && v_scroll < v_max_len){
            	if(!isShow){
            		/*$(".fixed-table").show(function(){
            			isShow = true;
            		});*/
            		$(".fixed-table")[0].style.display = "block";
            		isShow = true;
            	}
            }else{
            	if(isShow){
            		/*$(".fixed-table").hide(function(){
	            			isShow = false;
	            		});*/
	            	$(".fixed-table")[0].style.display = "";
            		isShow = false;
            	}
            }
        });
            /**/
		$main_tab = $(".table-wrapper");
		$fixed_tab = $(".fixed-table");
		/*水平监听：主表带动表头*/
	  $main_tab.scroll(function () {
	           $fixed_tab.scrollLeft($main_tab.scrollLeft());
	        });
	    /*水平监听：表头带动主表*/
	  $fixed_tab.scroll(function () {
	           $main_tab.scrollLeft($fixed_tab.scrollLeft());
	        });
       
});


