(function () {
    require.config({
        paths: {
            echarts: './echarts-2.2.7/build/dist',
            themes: './echarts-2.2.7/build/themes'
        },
        packages: [{
            name: 'BMap',
            location: './echarts-2.2.7/extension/BMap/src/',
            main: 'main'
        }]
    });

    require(
        [
            'echarts',
            'BMap',
            'echarts/chart/map',
            'echarts/chart/pie',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/radar',
            'themes/macarons'
        ],
        drawEcharts
    );

    function drawEcharts(echarts, BMapExtension) {
        drawBmpEcharts(echarts, BMapExtension);
        drawBarEcharts(echarts);
        drawRoseEcharts(echarts);
        drawVerticalBarEcharts(echarts);
        drawAreaLineEcharts(echarts);
        drawMixBarLineEcharts(echarts);
        drawDoughnutEcharts(echarts);
    };


    // BMP extension background
    function drawBmpEcharts(echarts, BMapExtension) {
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts, {
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();
        // 创建点坐标  
        var startPoint = {
            x: 104.114129,
            y: 37.550339
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        // 初始化地图，设置中心点坐标和地图级别  
        map.centerAndZoom(point, 5);
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(false);
        // 地图自定义样式
        // 通过个性地图编辑工具，自行编辑地图展示样式，生成地图样式json，然后通过JavaScriptAPI的方法调用生效
        map.setMapStyle({
            styleJson: [{
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#031528"
                    }
                },
                {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                        "color": "#000002"
                    }
                },
                {
                    "featureType": "boundary",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#029fd4"
                    }
                },
                {
                    "featureType": "railway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry",
                    "stylers": {
                        // "visibility": "off",
                        "color": "#004981"

                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#005b96",
                        "lightness": 1
                    }
                },
                {
                    "featureType": "highway",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry",
                    "stylers": {
                        "color": "#004981"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "color": "#00508b"
                    }
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                        "color": "#056197",
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "subway",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "manmade",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "local",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "arterial",
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                },
                {
                    "featureType": "boundary",
                    "elementType": "geometry.fill",
                    "stylers": {
                        "visibility": "off",
                        "color": "#465A6B"
                    }
                },
                {
                    "featureType": "building",
                    "elementType": "all",
                    "stylers": {
                        "color": "#1a5787"
                    }
                },
                {
                    "featureType": "label",
                    "elementType": "all",
                    "stylers": {
                        "visibility": "off"
                    }
                }
            ]
        });


        option = {
            color: ['gold', 'aqua', 'lime'],
            tooltip: {
                trigger: 'item',
                formatter: function (v) {
                    return v[1].replace(':', ' > ');
                }
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data: ['合肥'],
                selectedMode: 'single',
                textStyle: {
                    color: 'red'
                }
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            dataRange: {
                show: false,
                min: 0,
                max: 100,
                range: {
                    start: 10,
                    end: 90
                },
                x: 'right',
                calculable: true,
                color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                textStyle: {
                    color: '#fff'
                }
            },
            series: [{
                name: '合肥',
                type: 'map',
                mapType: 'none',
                data: [],
                geoCoord: {
                    '上海': [121.4648, 31.2891],
                    '东莞': [113.8953, 22.901],
                    '东营': [118.7073, 37.5513],
                    '中山': [113.4229, 22.478],
                    '临汾': [111.4783, 36.1615],
                    '临沂': [118.3118, 35.2936],
                    '丹东': [124.541, 40.4242],
                    '丽水': [119.5642, 28.1854],
                    '乌鲁木齐': [87.9236, 43.5883],
                    '佛山': [112.8955, 23.1097],
                    '保定': [115.0488, 39.0948],
                    '兰州': [103.5901, 36.3043],
                    '包头': [110.3467, 41.4899],
                    '合肥': [116.4551, 40.2539],
                    '北海': [109.314, 21.6211],
                    '南京': [118.8062, 31.9208],
                    '南宁': [108.479, 23.1152],
                    '南昌': [116.0046, 28.6633],
                    '南通': [121.1023, 32.1625],
                    '厦门': [118.1689, 24.6478],
                    '台州': [121.1353, 28.6688],
                    '合肥': [117.29, 32.0581],
                    '呼和浩特': [111.4124, 40.4901],
                    '咸阳': [108.4131, 34.8706],
                    '哈尔滨': [127.9688, 45.368],
                    '唐山': [118.4766, 39.6826],
                    '嘉兴': [120.9155, 30.6354],
                    '大同': [113.7854, 39.8035],
                    '大连': [122.2229, 39.4409],
                    '天津': [117.4219, 39.4189],
                    '太原': [112.3352, 37.9413],
                    '威海': [121.9482, 37.1393],
                    '宁波': [121.5967, 29.6466],
                    '宝鸡': [107.1826, 34.3433],
                    '宿迁': [118.5535, 33.7775],
                    '常州': [119.4543, 31.5582],
                    '广州': [113.5107, 23.2196],
                    '廊坊': [116.521, 39.0509],
                    '延安': [109.1052, 36.4252],
                    '张家口': [115.1477, 40.8527],
                    '徐州': [117.5208, 34.3268],
                    '德州': [116.6858, 37.2107],
                    '惠州': [114.6204, 23.1647],
                    '成都': [103.9526, 30.7617],
                    '扬州': [119.4653, 32.8162],
                    '承德': [117.5757, 41.4075],
                    '拉萨': [91.1865, 30.1465],
                    '无锡': [120.3442, 31.5527],
                    '日照': [119.2786, 35.5023],
                    '昆明': [102.9199, 25.4663],
                    '杭州': [119.5313, 29.8773],
                    '枣庄': [117.323, 34.8926],
                    '柳州': [109.3799, 24.9774],
                    '株洲': [113.5327, 27.0319],
                    '武汉': [114.3896, 30.6628],
                    '汕头': [117.1692, 23.3405],
                    '江门': [112.6318, 22.1484],
                    '沈阳': [123.1238, 42.1216],
                    '沧州': [116.8286, 38.2104],
                    '河源': [114.917, 23.9722],
                    '泉州': [118.3228, 25.1147],
                    '泰安': [117.0264, 36.0516],
                    '泰州': [120.0586, 32.5525],
                    '济南': [117.1582, 36.8701],
                    '济宁': [116.8286, 35.3375],
                    '海口': [110.3893, 19.8516],
                    '淄博': [118.0371, 36.6064],
                    '淮安': [118.927, 33.4039],
                    '深圳': [114.5435, 22.5439],
                    '清远': [112.9175, 24.3292],
                    '温州': [120.498, 27.8119],
                    '渭南': [109.7864, 35.0299],
                    '湖州': [119.8608, 30.7782],
                    '湘潭': [112.5439, 27.7075],
                    '滨州': [117.8174, 37.4963],
                    '潍坊': [119.0918, 36.524],
                    '烟台': [120.7397, 37.5128],
                    '玉溪': [101.9312, 23.8898],
                    '珠海': [113.7305, 22.1155],
                    '盐城': [120.2234, 33.5577],
                    '盘锦': [121.9482, 41.0449],
                    '石家庄': [114.4995, 38.1006],
                    '福州': [119.4543, 25.9222],
                    '秦皇岛': [119.2126, 40.0232],
                    '绍兴': [120.564, 29.7565],
                    '聊城': [115.9167, 36.4032],
                    '肇庆': [112.1265, 23.5822],
                    '舟山': [122.2559, 30.2234],
                    '苏州': [120.6519, 31.3989],
                    '莱芜': [117.6526, 36.2714],
                    '菏泽': [115.6201, 35.2057],
                    '营口': [122.4316, 40.4297],
                    '葫芦岛': [120.1575, 40.578],
                    '衡水': [115.8838, 37.7161],
                    '衢州': [118.6853, 28.8666],
                    '西宁': [101.4038, 36.8207],
                    '西安': [109.1162, 34.2004],
                    '贵阳': [106.6992, 26.7682],
                    '连云港': [119.1248, 34.552],
                    '邢台': [114.8071, 37.2821],
                    '邯郸': [114.4775, 36.535],
                    '郑州': [113.4668, 34.6234],
                    '鄂尔多斯': [108.9734, 39.2487],
                    '重庆': [107.7539, 30.1904],
                    '金华': [120.0037, 29.1028],
                    '铜川': [109.0393, 35.1947],
                    '银川': [106.3586, 38.1775],
                    '镇江': [119.4763, 31.9702],
                    '长春': [125.8154, 44.2584],
                    '长沙': [113.0823, 28.2568],
                    '长治': [112.8625, 36.4746],
                    '阳泉': [113.4778, 38.0951],
                    '青岛': [120.4651, 36.3373],
                    '韶关': [113.7964, 24.7028]
                },
                markLine: {
                    symbol: ['circle', 'circle'],
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 5
                    },
                    itemStyle: {
                        normal: {
                            color: 'white',
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 5
                            }
                        }
                    },
                    data: [
                        [{
                            name: '上海'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '广州'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '大连'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '南宁'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '南昌'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '拉萨'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '长春'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '包头'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '重庆'
                        }, {
                            name: '合肥',
                        }],
                        [{
                            name: '常州'
                        }, {
                            name: '合肥',
                        }]
                    ]
                },
                markPoint: {
                    symbol: 'emptyCircle',
                    symbolSize: 5,
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    itemStyle: {
                        normal: {
                            color: 'white',
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [{
                            name: '上海',
                        },
                        {
                            name: '广州',
                        },
                        {
                            name: '大连',
                        },
                        {
                            name: '南宁',
                        },
                        {
                            name: '南昌',
                        },
                        {
                            name: '拉萨',
                        },
                        {
                            name: '长春',
                        },
                        {
                            name: '包头',
                        },
                        {
                            name: '重庆',
                        },
                        {
                            name: '常州',
                        },
                        {
                            name: '合肥',
                            symbolSize: 20
                            // value: 100
                        }
                    ]
                }
            }, ]
        };
        
        var myChart = BMapExt.initECharts(container);
        window.onresize = myChart.onresize;
        // myChart.showLoading({
        //     text: "正在加载中...请稍后"
        // });
        // myChart.hideLoading();
        BMapExt.setOption(option);
    }

    // left-top doughnut-charts
    function drawDoughnutEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('leftTopDoughnut'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
        
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
                x: 'center',
                y: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['25%', '60%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    data: [{
                            value: 335,
                            name: '直接访问'
                        },
                        {
                            value: 310,
                            name: '邮件营销'
                        },
                        {
                            value: 234,
                            name: '联盟广告'
                        },
                        {
                            value: 135,
                            name: '视频广告'
                        },
                        {
                            value: 1548,
                            name: '搜索引擎'
                        }
                    ]
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['70%', '60%'],

                    data: [{
                            value: 335,
                            name: '直接访问'
                        },
                        {
                            value: 310,
                            name: '邮件营销'
                        },
                        {
                            value: 234,
                            name: '联盟广告'
                        },
                        {
                            value: 135,
                            name: '视频广告'
                        },
                        {
                            value: 1548,
                            name: '搜索引擎'
                        }
                    ]
                },
                
            ]
        });
    };

    // left-center mix-bar-line charts
    function drawMixBarLineEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('leftCenterMixBarLine'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
            grid: {
                x: 50,
                y: 20,
                x2: 30,
                y2: 50,
                borderWidth: 0
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            legend: {
                data: ['蒸发量', '降水量', '平均温度'],
                y: 'bottom',
                textStyle: {
                    color: 'white'
                }
            },
            xAxis: [{
                type: 'category',
                data: ['1年', '2年', '3年', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                splitLine: {
                    show: false,
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                },
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                }
            }],
            yAxis: [{
                    type: 'value',
                    name: '水量',
                    axisLabel: {
                        formatter: '{value} ml'
                    },
                    splitLine: {
                        show: false,
                        color: ['#ccc'],
                        width: 1,
                        type: 'solid'
                    },
                    axisLabel: {
                        show: true,

                        interval: 'auto', // {number}
                        textStyle: {
                            color: 'white',
                            fontFamily: 'sans-serif',
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#039DA9',
                            width: 2
                        }
                    }

                },
                {
                    type: 'value',
                    name: '温度',
                    axisLabel: {
                        formatter: '{value} °C'
                    },
                    splitLine: {
                        show: false,
                        color: ['#ccc'],
                        width: 1,
                        type: 'solid'
                    },
                    axisLabel: {
                        show: true,

                        interval: 'auto', // {number}
                        textStyle: {
                            color: 'white',
                            fontFamily: 'sans-serif',
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#039DA9',
                            width: 2
                        }
                    }
                }
            ],
            series: [

                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '平均温度',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        });
    };

    // left-bottom area-line charts
    function drawAreaLineEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('leftBottomAreaLine'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
            grid: {
                x: 50,
                y: 10,
                x2: 20,
                y2: 50,
                borderWidth: 0
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['意向', '预购', '成交'],
                y: 'bottom',
                textStyle: {
                    color: 'white'
                }
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                splitLine: {
                    show: false,
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                },
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false,
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                },
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                }
            }],
            series: [{
                    name: '成交',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [10, 12, 21, 54, 260, 830, 710]
                },
                {
                    name: '预购',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [30, 182, 434, 791, 390, 30, 10]
                },
                {
                    name: '意向',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [1320, 1132, 601, 234, 120, 90, 20]
                }
            ]
        });
    };

    // right-top bar charts
    function drawBarEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('rightTopBar'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
            grid: {
                x: 50,
                y: 10,
                x2: 20,
                y2: 50,
                borderWidth: 0
            },
            // title: {
            //     show: false,
            //     text: '世界人口总量',
            //     subtext: '数据来自网络'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: true,
                //y: '30px',
                y: 'bottom',
                textStyle: {
                    color: 'white'
                },
                data: ['2011年', '2012年']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine: {
                    show: false,
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                },
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                }
            }],
            yAxis: [{
                type: 'category',
                data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
                splitLine: {
                    show: false,
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                },
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                }
            }],
            series: [{
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        });
    };

    // right-center rose charts
    function drawRoseEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('rightCenterPie'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
            title: {
                show: false,
                text: '南丁格尔玫瑰图',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
                x: 'center',
                y: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [{
                name: '面积模式',
                type: 'pie',
                radius: [30, 110],
                // center: ['75%', 200],
                roseType: 'area',
                // x: '50%', // for funnel
                max: 40, // for funnel
                sort: 'ascending', // for funnel
                data: [{
                        value: 10,
                        name: 'rose1'
                    },
                    {
                        value: 5,
                        name: 'rose2'
                    },
                    {
                        value: 15,
                        name: 'rose3'
                    },
                    {
                        value: 25,
                        name: 'rose4'
                    },
                    {
                        value: 20,
                        name: 'rose5'
                    },
                    {
                        value: 35,
                        name: 'rose6'
                    },
                    {
                        value: 30,
                        name: 'rose7'
                    },
                    {
                        value: 40,
                        name: 'rose8'
                    }
                ]
            }]
        });
    };

    // right-bottom vertical-bar charts
    function drawVerticalBarEcharts(echarts) {
        var myChart = echarts.init(document.getElementById('rightBottomBar'), 'macarons');
        myChart.showLoading({
            text: "正在加载中...请稍后"
        });
        myChart.hideLoading();
        myChart.setOption({
            grid: {
                x: 40,
                y: 10,
                x2: 20,
                y2: 50,
                borderWidth: 0
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: true,
                //y: '30px',
                y: 'bottom',
                textStyle: {
                    color: 'white'
                },
                data: ['蒸发量', '降水量']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                },
                splitLine: {
                    show: false,
                    // color: ['#ccc'],
                    // width: 1,
                    // type: 'solid'
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: true,

                    interval: 'auto', // {number}
                    textStyle: {
                        color: 'white',
                        fontFamily: 'sans-serif',
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#039DA9',
                        width: 2
                    }
                },
                splitLine: {
                    show: false,
                    // color: ['#ccc'],
                    // width: 1,
                    // type: 'solid'
                }
            }],
            series: [{
                    name: '蒸发量',
                    type: 'bar',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    // markPoint: {
                    //     data: [{
                    //             type: 'max',
                    //             name: '最大值'
                    //         },
                    //         {
                    //             type: 'min',
                    //             name: '最小值'
                    //         }
                    //     ]
                    // },
                    // markLine: {
                    //     data: [{
                    //         type: 'average',
                    //         name: '平均值'
                    //     }]
                    // }
                },
                {
                    name: '降水量',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    // markPoint: {
                    //     data: [{
                    //             name: '年最高',
                    //             value: 182.2,
                    //             xAxis: 7,
                    //             yAxis: 183,
                    //             symbolSize: 18
                    //         },
                    //         {
                    //             name: '年最低',
                    //             value: 2.3,
                    //             xAxis: 11,
                    //             yAxis: 3
                    //         }
                    //     ]
                    // },
                    // markLine: {
                    //     data: [{
                    //         type: 'average',
                    //         name: '平均值'
                    //     }]
                    // }
                }
            ]
        });
    };


})();