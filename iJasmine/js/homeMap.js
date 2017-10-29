$(document).ready(function(){
    var homeMap = echarts.init(document.getElementById('home-map'));
    echarts.util.mapData.params.params.NewZealand = {
        getGeoJson: function (callback) {
            $.getJSON('/js/lib/eCharts/newZealand.geo.json', callback);
        }
    };
    var options = {
        tooltip : {
            trigger: 'item'
        },
        series : [
            {
                type: 'map',
                mapType: 'NewZealand',
                mapLocation: {
                    x : 'center',
                    y : 'center',
                },
                roam: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        },
                        borderWidth: 1,
                        borderColor: '#999',
                        areaStyle: {
                            color: 'transparent'
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        },
                        borderWidth: 1,
                        borderColor: '#f76459',
                        areaStyle: {
                            color: '#f76459'
                        }
                    }
                },
                data:[],
                nameMap:{
                    "Northland": '北部地区',
                    "Auckland": '奥克兰',
                    "Waikato": '怀卡托',
                    "Bay of Plenty": '丰盛湾',
                    "Gisborne District": '吉斯伯尔尼',
                    "Taranaki": '塔拉纳奇',
                    "Manawatu-Wanganui": '马纳瓦图－旺加努伊',
                    "Hawke's Bay": '豪克斯湾',
                    "Wellington": '惠灵顿',
                    "Tasman District": '塔斯曼',
                    "Marlborough District": '马尔堡',
                    "Nelson City": '尼尔逊',
                    "Canterbury": '坎特伯雷',
                    "West Coast": '西岸',
                    "Otago": '奥塔哥',
                    "Southland": '南部地区',
                    "The Snares": '斯奈尔斯群岛'
                },
                geoCoord:{
                    "Northland": [3020, 8870],
                    "Auckland": [3630, 7810],
                    "Waikato": [3960, 6930],
                    "Bay of Plenty": [4960, 6640],
                    "Gisborne District": [6000, 6450],
                    "Taranaki": [3480, 5910],
                    "Manawatu-Wanganui": [4070, 5100],
                    "Hawke's Bay": [4860, 5750],
                    "Wellington": [3950, 4500],
                    "Tasman District": [2200, 4100],
                    "Marlborough District": [3110, 4100],
                    "Nelson City": [2740, 4750],
                    "Canterbury": [2050, 2730],
                    "West Coast":  [1310, 3220],
                    "Otago": [840, 1250],
                    "Southland": [-550, 720],
                    "The Snares": [-550, -800]
                }
            }
        ]
    };
    homeMap.on(echarts.config.EVENT.CLICK, clickArea);
    $(window).on('resize.homeMap', function(){
        homeMap.resize();
    });
    homeMap.setOption(options);
    function clickArea(data){
        console.log(data)
    }

    var geoAve = function ( list ){
        var a = 0, b = 0, index = 0;
        _calc(list);
        var aAve = a / index;
        var bAve = b / index;
        function _calc(list){
            list.forEach(function(item){
                if( item[0] instanceof Array ){
                    _calc(item)
                } else{
                    a += item[0];
                    b += item[1];
                    index ++;
                }
            });
        }
        return [aAve,bAve]
    }


});