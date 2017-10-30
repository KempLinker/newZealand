(function() {
    angular.module('iJasmine').directive('newZealandMap', newZealandMapDirective);

    newZealandMapDirective.$inject = ['$http'];

    function newZealandMapDirective($http) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div id="home-map"></div>',
            scope: {
                viewData: '='
            },
            link: function ($scope, element, attr) {

                var newZealandMap = echarts.init(document.getElementById('home-map'));
                echarts.util.mapData.params.params.NewZealand = {
                    getGeoJson: function (callback) {
                        $.getJSON('/js/lib/eCharts/newZealand.geo.json', callback);
                    }
                };
                var options = {
                    series : [
                        {
                            type: 'map',
                            selectedMode: 'single',
                            mapType: 'NewZealand',
                            mapLocation: {
                                x : 'center',
                                y : 'center',
                            },
                            roam: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    borderWidth: 1,
                                    borderColor: '#999',
                                    areaStyle: {
                                        color: 'transparent'
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        color: '#3f3f3c'
                                    },
                                    borderWidth: 1,
                                    borderColor: '#f76459',
                                    areaStyle: {
                                        color: '#f76459'
                                    }
                                }
                            },
                            data:[
                                { name: 'Northland', selected: true }
                            ],
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
                                "Northland": [1800, 8500],
                                "Auckland": [2400, 7800],
                                "Waikato": [2600, 7000],
                                "Bay of Plenty": [5100, 7400],
                                "Gisborne District": [6800, 6600],
                                "Taranaki": [2000, 5900],
                                "Manawatu-Wanganui": [2200, 5200],
                                "Hawke's Bay": [5800, 5500],
                                "Wellington": [4800, 4200],
                                "Tasman District": [1600, 5000],
                                "Marlborough District": [3900, 3900],
                                "Nelson City": [3000, 4900],
                                "Canterbury": [3400, 2700],
                                "West Coast":  [800, 3300],
                                "Otago": [2200, 1100],
                                "Southland": [-1800, 800],
                                "The Snares": [-550, -750]
                            }
                        }
                    ]
                };
                newZealandMap.on(echarts.config.EVENT.CLICK, clickArea);
                $(window).on('resize.homeMap', function(){
                    newZealandMap.resize();
                });
                newZealandMap.setOption(options);
                function clickArea(data){
                    var geoData = $scope.viewData.geoData;
                    geoData.forEach(function (geo) {
                        if( geo.geoName == data.name ){
                            $scope.viewData.geoInfo = geo;
                        }
                    });
                    console.log($scope.viewData.geoInfo)
                }


            }
        }

    }
})();
