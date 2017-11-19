(function() {

    angular.module("iJasmine").controller('customCtrl', customCtrl);

    customCtrl.$inject = ['$scope'];

    function customCtrl($scope) {

        $scope.toggleDetail = toggleDetail;
        function toggleDetail( ev ){
            var $tarDom = $(ev.target);
            var $parentDom = $tarDom.parents('li');
            var $infoDom = $parentDom.find('.step-info');
            if( $parentDom.hasClass('active') ){
                $infoDom.slideUp();
                $parentDom.removeClass('active');
                $tarDom.text('查看');

            } else{
                $infoDom.slideDown();
                $parentDom.addClass('active');
                $tarDom.text('收起');
            }
        }

    }
})();

