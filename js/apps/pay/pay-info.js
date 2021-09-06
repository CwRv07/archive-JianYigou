var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.orderData = getOrderData();
    $scope.payLocation = getPayLocation();

    $scope.id = checkOrderData($scope.payLocation);

    $scope.orderItemData = $scope.orderData[$scope.id];
    $scope.payWay = $scope.orderItemData.payWay;
    $scope.orderPrice = $scope.orderItemData.orderPrice;
    $(function () {
        $('.body .pay_way span').hide();
        $('.body .pay_way span').eq($scope.payWay - 1).show();
    })



    $scope.toOrderManagement = function () {
        window.location.href = 'order_management.html';
    }
    $scope.toindex = function () {
        window.location.href = 'index.html';
    }

}]);

$(function () {
    haveToLogin();
});




//订单函数
function getOrderData() {
    var data = localStorage.getItem('order_info');
    if (data != null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
function saveOrderData(local) {
    localStorage.setItem('order_info',
        JSON.stringify(local));
}
function checkOrderData(id) {
    var data = getOrderData();
    var number = -1;
    $.each(data, function (i, n) {
        if (n.id == id) {
            number = i;
            return false;
        }
    });
    return number;
}

// 支付页面信息函数
function getOrderLocation() {
    var id = localStorage.getItem('order_location');
    if (id != null) {
        return id;
    } else {
        return 1;
    }
}

function saveOrderPrLocation(id) {
    localStorage.setItem('order_location', id);
}

function getPayLocation() {
    var id = localStorage.getItem('pay_location');
    if (id != null) {
        return id;
    } else {
        return 1;
    }
}

function savePayLocation(id) {
    localStorage.setItem('pay_location', id);
}