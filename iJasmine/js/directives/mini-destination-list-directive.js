(function() {
    angular.module('iJasmine').directive('miniDestinationList', miniDestinationListDirective);

    miniDestinationListDirective.$inject = ['$rootScope', '$timeout'];

    function miniDestinationListDirective($rootScope, $timeout) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/component/mini-destination-list.html',
            scope: {
                viewData: '='
            },
            link: function ($scope, element, attr) {

                $scope.miniViewData = {
                    selected: '',
                    list: [],
                    showList: false,
                    showSelectList: showSelectList
                };

                function showSelectList( type ) {
                    $scope.miniViewData.showList = !$scope.miniViewData.showList;

                }

            }
        }

    }
})();
