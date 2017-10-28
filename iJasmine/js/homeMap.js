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
                data:[

                ]
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


});