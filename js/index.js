// ----------------------------------------------柱状图
!function () {
    var myChart = echarts.init(document.getElementById("bar")); 
    var option = {
        grid: {
            // 距离 上右下左 的距离
            left: '3%',
            right: '2%',
            bottom: '6%',
            top: "6%",
            // 是否包含文本说明
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [{
            data: [],
            type: 'bar'
        }],
        barWidth: 20,
        tooltip: {
          trigger: 'axis'
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
              offset: 0, color: '#f8fbfb' // 0% 处的颜色
          }, {
              offset: 1, color: '#0861c5' // 100% 处的颜色
          }],
          // global: false // 缺省为 false
      }
    };
    myChart.setOption(option);

    var meChart = echarts.init(document.getElementById("line")); 
    var myoption = {
        grid: {
            // 距离 上右下左 的距离
            left: '3%',
            right: '2%',
            bottom: '6%',
            top: "6%",
            // 是否包含文本说明
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [{
            data: [],
            type: 'line',
            smooth: true,
            areaStyle: {
                color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#f8fbfb' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0861c5' // 100% 处的颜色
                    }],
                    // global: false // 缺省为 false
                }
            }
        }],
        tooltip: {
          trigger: 'axis'
        },
        color:['#aab1b7']
    };
    meChart.setOption(myoption);

    // -------------------------------------展示
    // 本地存储数据
    /* var list = [
        {
            name: "新用户",
            number: 100,
            money: 30
        }
    ];
    localStorage.setItem("project", JSON.stringify(list)); */

    // 本地存储数据渲染在页面中
    var list;
    function get() {
        var str = localStorage.getItem("project") || "[]";
        list = JSON.parse(str);
        var tr;
        $("tbody").empty();
        option.xAxis.data = [];
        option.series[0].data = [];
        myoption.xAxis.data = [];
        myoption.series[0].data = [];
        $.each(list, function (index, ele) {
            tr = $(`<tr>
                        <td>${ele.name}</td>
                        <td>${ele.number}</td>
                        <td>${ele.money}</td>
                        <td><img src="./images/del.png" alt="" id="img" index="${index}"></td>
                    </tr>`);
            $("tbody").append(tr);
            option.xAxis.data.push(ele.name);
            option.series[0].data.push(ele.number);
            myoption.xAxis.data.push(ele.name);
            myoption.series[0].data.push(ele.money);
        });
        myChart.setOption(option);
        meChart.setOption(myoption);
    }
    get();

    // ------------------------------------------------新增功能
    $("button").on("click", function () {
        if ($("#name").val() == "" || $("#number").val() == "" || $("#money").val() == "") {
            alert("内容不能为空！")
            $("#name, #number, #money").val("");
            return false;
        }
        var obj = {
            name: $("#name").val(),
            number: $("#number").val(),
            money: $("#money").val()
        }
        list.unshift(obj);
        localStorage.setItem("project", JSON.stringify(list));
        $("#name, #number, #money").val("");
        get();
    })


    // ----------------------------------------------删除功能
    $("tbody").on("click", "#img", function (e) {
        var i = $(e.target).attr("index");
        list.splice(i, 1);
        localStorage.setItem("project", JSON.stringify(list));
        get();
    })
}()
