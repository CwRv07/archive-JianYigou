var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', function ($scope) {
    PaintData();
    //初始化订单数据
    function PaintData() {
        $scope.orderData = getOrderData();
        $scope.orderData = $scope.orderData.splice(1);
        $scope.shopData = getShopData();
        $.each($scope.orderData, function (i, n) {
            var shopNumber = +(0);
            $.each(n.order, function (i, n) {
                var data = $scope.shopData[n.id];
                // console.log(typeof (n));
                n.id = data.id;
                n.name = data.name
                n.price = data.price
                n.src = data.src
                shopNumber += +(n.number);
            });
            // console.log(shopNumber + ' ' + typeof (shopNumber));
            n.shopNumber = shopNumber;
            n.travelPrice = shopNumber.toFixed(2);
            $(function () {
                // console.log(i);
                $('.body .right>.container').eq(i + 1).children(".order_info").children(".state").children().hide();
                $('.body .right>.container').eq(i + 1).children(".order_info").children(".state").children().eq(n.stats - 1).show();
                $('.body .right>.container').eq(i + 1).children(".order_button").children(".col-5").children("button").hide();
                if (n.stats == 1) {
                    $('.body .right>.container').eq(i + 1).children(".order_button").children(".col-5").children("button").eq(0).show();
                } else if (n.stats == 2) {
                    $('.body .right>.container').eq(i + 1).children(".order_button").children(".col-5").children("button").eq(1).show();
                    $('.body .right>.container').eq(i + 1).children(".order_button").children(".col-5").children("button").eq(2).show();
                }
            });
        });

        // console.log($scope.orderData);
        $scope.orderItemData = $scope.orderData;
        $('.nothing').hide();
        if ($scope.orderItemData.length == 0) {
            console.log('芜湖');
            $('.nothing').show();
        }
    }
    $scope.imgAddress = function (src) {
        return './img/' + src;
    }

    //商品详情
    $scope.details = function (id) {
        saveDetailsData(id);
        window.open('./details.html');

    }


    // 立即付款
    $scope.toPay = function (id) {
        saveOrderLocation(checkOrderData(id));
        window.location.href = 'pay.html'
    }
    // 取消订单
    $scope.removeOrder = function (id) {
        $scope.newOrderData = getOrderData();
        $scope.newOrderData.splice(checkOrderData(id), 1);
        console.log($scope.newOrderData);
        saveOrderData($scope.newOrderData);
        PaintData();
    }
    //催促发货
    $scope.sendGoods = function (id) {
        $scope.newOrderData = getOrderData();
        $scope.newOrderData[checkOrderData(id)].stats = 3;
        saveOrderData($scope.newOrderData);
        PaintData();
    }


    // 过滤
    $scope.search = 0;
    $scope.func = function (e) {
        if ($scope.search == 0) {
            return e;
        } else {
            return e.stats == $scope.search;
        }
    }
    $scope.PayState = function (state) {

        $('.left .choosestate a').removeClass('click');
        $('.left .choosestate a').eq(state + 1).addClass('click');
        $scope.search = state;

        PaintData();
        if (state > 0) {
            var result = 'show';
            $.each($scope.orderData, function (i, n) {
                if (n.stats == state) {
                    result = 'hide';
                    return false;
                }
            })
            if (result == 'show') {
                $('.nothing').show();
            } else {
                $('.nothing').hide();
            }

        }
    }

    // 登录信息
    userName();
    function userName() {
        var data = JSON.parse(localStorage.getItem('user_login'));
        if (data == null) {
            return;
        } else {
            $scope.userName = data[0].name;
        }
    }
    $scope.refresh = function () {
        window.location.href = 'order_management.html';
    }
    // console.log($scope.userName);
    // $scope.userName = $scope.userName[0].name;
    // console.log($scope.userName);




    // $scope.orderItemData =
    // console.log($scope.orderItemData);

    // 修改密码
    $scope.changePassWord = function () {
        var nowdata = JSON.parse(localStorage.getItem('user_login'));
        if (nowdata == null) {
            return;
        } else {
            var data = getUserData();

            var oldPassWord = prompt("请输入您的原密码", "");
            if (login_check(nowdata[0].name, oldPassWord) == 2) {
                var newPassWord = prompt("请输入您的新密码", "");
                console.log(newPassWord);
                if (newPassWord == '' || newPassWord == null) {
                    alert('新密码不可为空');
                    return;
                }
                $.each(data, function (i, n) {
                    if (n.name == nowdata[0].name) {
                        n.password = newPassWord;
                        console.log('密码修改成功');
                    }
                });

                alert('密码修改成功');
                saveUserData(data);

            } else {
                alert('您的原密码输入错误');
            }
        }
        // var data = getUserData();

    }


}]);


$(function () {

    $('.right').on('click', '.order_button .delete', function () {
        $(this).parents(".item").remove();
    });

    haveToLogin();
})


//收件信息函数
function getAddressData() {
    var data = localStorage.getItem('adress_info');
    if (data != null) {
        return JSON.parse(data);
    } else {
        var addressdata = [{
            'name': '好人1',
            'address': '湖南农业大学第一教学楼110室',
            'phone': '110',
            'default': 1
        }, {
            'name': '好人2',
            'address': '湖南农业大学第二教学楼119室',
            'phone': '119',
            'default': 0
        }, {
            'name': '好人3',
            'address': '湖南农业大学第三教学楼120室',
            'phone': '120',
            'default': 0
        }];
        saveAddressData(addressdata);
        return addressdata;
    }
}
function saveAddressData(local) {
    localStorage.setItem('adress_info',
        JSON.stringify(local));
}

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

function saveOrderLocation(id) {
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



// 详情页信息函数
function getDetailsData() {
    var id = localStorage.getItem('details_location');
    if (id != null) {
        return id;
    } else {
        return 0;
    }
}

function saveDetailsData(id) {
    localStorage.setItem('details_location', id);
}