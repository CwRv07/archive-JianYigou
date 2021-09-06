var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.orderData = getOrderData();
    $scope.orderLocation = getOrderLocation();
    $scope.nowOrderData = $scope.orderData[$scope.orderLocation];
    // console.log($scope.nowOrderData);
    // console.log($scope.nowOrderData);


    //初始化待支付订单信息
    $scope.id = $scope.nowOrderData.id;
    $scope.orderItemData = $scope.nowOrderData.order;
    // console.log($scope.orderItemData);
    $scope.payWay = $scope.nowOrderData.payWay;
    $scope.orderPrice = $scope.nowOrderData.orderPrice;
    $(function () {
        $('.body .pay_picture').hide();
        $('.body .pay_picture').eq($scope.payWay - 1).show();
    });


    // 切换支付方式
    $scope.changePayWay = function (number) {
        $('.body .pay_picture').hide();
        $('.body .pay_picture').eq(number - 1).show();
        $scope.neworderData = getOrderData();
        var id = checkOrderData($scope.id);
        $scope.neworderData[id].payWay = number;
        saveOrderData($scope.neworderData);
    }


    // 待支付
    $scope.waitPay = function () {
        window.location.href = 'order_management.html';
    }
    // 已支付
    $scope.hadPay = function () {
        $scope.neworderData = getOrderData();
        var id = checkOrderData($scope.id);
        if ($scope.neworderData[id].stats == 1) {
            $scope.neworderData[id].stats = 2;
            // console.log($scope.neworderData);
            saveOrderData($scope.neworderData);
            savePayLocation($scope.id);
            window.location.href = 'pay-true.html';
        } else {
            window.location.href = 'pay-false.html';
        }
    }

}]);


$(function () {
    hasToLogin();
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
        return 0;
    }
}

function savePayLocation(id) {
    localStorage.setItem('pay_location', id);
}


