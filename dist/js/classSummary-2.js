
/*echarts pic学生拍题*/
var option_pic = {


    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
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
            boundaryGap : false,
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
        axisTick:{show:false},
        type: 'value',
        show:true,
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

/*echarts 学生答题*/
var option_ans = {

    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    toolbox:false,
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
            boundaryGap : false,
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
        splitNumber:2,
        axisTick:{show:false},
        type: 'value',
        show:true,
        axisLine:{
            show:false,
            
        }
    },
    series : [
        {
            name:'直接访问',
            type:'line',
            data:[32, 43, 111, 80,20],
            lineStyle:{
                normal:{
                   color:"#61a0a8" 
                }
            }
        }
    ]
};

var chart_ans = echarts.init(document.getElementById('charts-ans'));
chart_ans.setOption(option_ans);
/*echarts 学生开小差*/
var option_desertion = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    toolbox:false,
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
            boundaryGap : false,
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
        splitNumber:2,
        axisTick:{show:false},
        type: 'value',
        show:true,
        axisLine:{
            show:false,
            
        }
    },
    series : [
        {
            name:'直接访问',
            type:'line',
            data:[3, 4, 11, 8,20,14,11,10,1,11,10,1],
            lineStyle:{
                normal:{
                   color:"#61a0a8" 
                }
            }
        }
    ]
};

var chart_desertion = echarts.init(document.getElementById('charts-desertion'));
chart_desertion.setOption(option_desertion);
/*echarts 知识点掌握情况*/
var option_knowledge = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',
        data:['未掌握','较模糊','已掌握']
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
                {value:3, name:'未掌握'},
                {value:4, name:'较模糊'},
                {value:16, name:'已掌握'}
            ]
        }
    ]
};
var chart_knowledge = echarts.init(document.getElementById('charts-knowledge'));
chart_knowledge.setOption(option_knowledge);
/*echarts 作业难度*/
var option_homework = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    toolbox:false,
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
            boundaryGap : false,
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
        splitNumber:2,
        axisTick:{show:false},
        type: 'value',
        show:true,
        formatter: function (value, index) {
			    // 格式化成月/日，只在第一个刻度显示年份
			    var level="";
			    if(index == 0){
			    	level="普通"; 
			    }else if(index == 5){
			    	level="较难"; 
			    }else if(value == 10){
			    	level="难"; 
			    }
			    return level;
			},
        axisLine:{
            show:false,
            
        }
    },
    series : [
        {
            name:'直接访问',
            type:'line',
            data:[3, 4, 1, 8,2,4,1,10,1,7,4,6],
            lineStyle:{
                normal:{
                   color:"#61a0a8" 
                }
            }
        }
    ]
};

var chart_homework = echarts.init(document.getElementById('charts-homework'));
chart_homework.setOption(option_homework);
/*echarts 备课情况*/
var option_preparation = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'备课充分'},
		        {icon:'circle',name:'备课一般'},
		        {icon:'circle',name:'备课不足'}
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
                {value:3, name:'备课不足'},
                {value:4, name:'备课一般'},
                {value:16, name:'备课充分'}
            ]
        }
    ]
};
var chart_preparation = echarts.init(document.getElementById('charts-preparation'));
chart_preparation.setOption(option_preparation);
/*echarts 授课难度情况*/
var option_teaching_difficuty = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'易'},
		        {icon:'circle',name:'适中'},
		        {icon:'circle',name:'难'}
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
                {value:3, name:'易'},
                {value:4, name:'适中'},
                {value:16, name:'难'}
            ]
        }
    ]
};
var chart_teaching_difficuty = echarts.init(document.getElementById('charts-teaching-difficuty'));
chart_teaching_difficuty.setOption(option_teaching_difficuty);
/*echarts 授课思路清晰情况*/
var option_teaching_idea= {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',

        data:[{icon:'circle',name:'清晰'},
		        {icon:'circle',name:'不清晰'}
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
                {value:3, name:'清晰'},
                {value:16, name:'不清晰'}
            ]
        }
    ]
};
var chart_teaching_idea= echarts.init(document.getElementById('charts-teaching-idea'));
chart_teaching_idea.setOption(option_teaching_idea);
/*echarts 作业难度*/
var option_homework = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
    },
    toolbox:false,
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
            boundaryGap : false,
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
        splitNumber:2,
        axisTick:{show:false},
        type: 'value',
        show:true,
        formatter: function (value, index) {
			    // 格式化成月/日，只在第一个刻度显示年份
			    var level="";
			    if(index == 0){
			    	level="普通"; 
			    }else if(index == 5){
			    	level="较难"; 
			    }else if(value == 10){
			    	level="难"; 
			    }
			    return level;
			},
        axisLine:{
            show:false,
            
        }
    },
    series : [
        {
            name:'直接访问',
            type:'line',
            data:[3, 4, 1, 8,2,4,1,10,1,7,4,6],
            lineStyle:{
                normal:{
                   color:"#61a0a8" 
                }
            }
        }
    ]
};

var chart_homework = echarts.init(document.getElementById('charts-homework'));
chart_homework.setOption(option_homework);
/*echarts pic学生拍题*/
var option_homework_score = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告']
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
            boundaryGap : false,
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
        splitNumber:2,
        axisTick:{show:false},
        type: 'value',
        show:true,
        axisLine:{
            show:false,
            
        }
    },
    series : [
        {
            name:'直接访问',
            type:'line',
            data:[32, 73, 1, 93, 40, 30, 20,2, 1, 33, 40, 30],
            lineStyle:{
                normal:{
                   color:"#c23531" 
                }
            }
        }
    ]
};

var chart_homework_score = echarts.init(document.getElementById('charts-homework-score'));
chart_homework_score.setOption(option_homework_score);


