var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.addressData = getAddressData();

    $scope.defaultTapActive = function () {
        console.log($('.receiver_info tbody>tr'));
    }

    // 默认收货地址初始化
    $.each($scope.addressData, function (i, n) {
        if (n.default == 1) {
            $scope.chooseAddress = $scope.addressData[i].address;
            $scope.choosePhone = $scope.addressData[i].phone;
            $(function () {
                console.log(i);
                $('.receiver_info tbody>tr').eq(i).children('.default').children().addClass('active');
            })
        }

    });


    // $scope.phone = '123';
    $scope.edit = function (id) {
        // var addressdata = getAddressData();
        $scope.id = id;
        $scope.name = $scope.addressData[id].name;
        $scope.address = $scope.addressData[id].address;
        $scope.phone = $scope.addressData[id].phone;
        if ($scope.addressData[id].default == 1) {
            // console.log(123);
            $scope.chooseAddress = $scope.addressData[id].address;
            $scope.choosePhone = $scope.addressData[id].phone;
        }
        // console.log(addressdata[id].phone);
    }
    $scope.save = function () {
        // if (confirm('') == true) {
        //     console.log(1);
        //     $('#edit_modal').modal('hide')
        // } else {
        //     console.log(2);
        // }
        var id = $scope.id;
        if (id == $scope.addressData.length) {
            if ($scope.name == '' || $scope.address == '' || $scope.phone == '') {
                alert('信息内容不可为空');
            } else {
                $scope.addressData.push({ name: $scope.name, address: $scope.address, phone: $scope.phone, default: 0 });
                saveAddressData($scope.addressData);
                $('#edit_modal').modal('hide');
            }
        } else {
            $('#edit_modal').modal('hide');
            $scope.addressData[id].name = $scope.name;
            $scope.addressData[id].address = $scope.address;
            $scope.addressData[id].phone = $scope.phone;
            console.log($scope.addressData[id].phone);
            saveAddressData($scope.addressData);
        }
    }
    $scope.default = function (id) {
        $.each($scope.addressData, function (i, n) {
            n.default = 0;
        })
        $scope.addressData[id].default = 1;
        $scope.chooseAddress = $scope.addressData[id].address;
        $scope.choosePhone = $scope.addressData[id].phone;
        saveAddressData($scope.addressData);
    }
    $scope.delete = function (id) {
        if ($scope.addressData.length > 1) {
            $scope.addressData.splice(id, 1);
            $scope.addressData[0].default = 1;
            saveAddressData($scope.addressData);
        } else {
            alert('收件地址最少需保留一个');
        }
    }
    $scope.addAddress = function () {
        var id = +($scope.addressData.length);
        $scope.id = id;
        console.log(id);
        $scope.name = '';
        $scope.address = '';
        $scope.phone = '';
        $('#edit_modal').modal('show');
    }


    $scope.payWay = 1;
    $('.body .pay_way .choose button').eq(($scope.payWay - 1)).addClass('active');
    $scope.choosePayWay = function (number) {
        $scope.payWay = number;
        console.log($scope.payWay);
    }

    // 订单数据获取
    // $scope.orderId = 0;
    $scope.orderData = getOrderData();
    $scope.shopData = getShopData();
    $scope.orderItemData = [];
    $scope.shopNumber = 0;
    $scope.shopPrice = 0;
    $.each($scope.orderData[0].order, function (i, n) {
        var data = $scope.shopData[n.id];
        data.number = n.number
        $scope.shopNumber += +(n.number);
        data.allprice = (n.number * data.price).toFixed(2);
        $scope.shopPrice += +(data.allprice);
        $scope.orderItemData.push({ id: data.id, name: data.name, price: data.price, number: data.number, src: data.src, allprice: data.allprice });
        // $scope.orderItemData.push({ id: n.id, src: n.src, name: n.name, price: n.price, inCar: n.inCar })
    });
    console.log($scope.orderItemData);

    $scope.imgAddress = function (src) {
        return './img/' + src;
    };


    // 账单数据获取
    var shopPrice = +($scope.shopPrice);
    $scope.shopPrice = shopPrice.toFixed(2);
    var travelPrice = +($scope.shopNumber);
    $scope.travelPrice = travelPrice.toFixed(2);
    var orderPrice = +($scope.shopNumber) + +($scope.shopPrice);
    // console.log(+($scope.shopNumber) + '+' + +($scope.shopPrice) + '=' + orderPrice);
    $scope.orderPrice = orderPrice.toFixed(2);



    // 提交订单
    $scope.imputOrder = function () {
        if ($scope.orderData[0].length == []) {
            alert('对不起，本次订单已提交或内容为空而操作失败');
            return;
        }


        var result = true;
        // console.log($scope.orderData[0].length == 0);
        var uuid = $('.body .shopping_list').attr('data-orderuuid');
        var newOrderData = getOrderData();
        $.each(newOrderData, function (i, n) {
            if (n.id == $scope.id) {
                alert('对不起，本次订单已提交或内容为空而操作失败');
                result = false;
                return false;
            }
        })
        if (result == false) {
            return;
        }

        if (newOrderData[0].id == uuid) {
            var data = $scope.orderData[0];

            data.stats = 1;//待支付 1待支付 2已支付
            data.payWay = $scope.payWay//支付方式 1微信 2支付宝 3云闪付
            // data.address = $scope.chooseAddress//收货地址
            // data.phone = $scope.choosePhone//手机号
            data.orderPrice = $scope.orderPrice;
            data.time = getTime();

            newOrderData.push(data);
            newOrderData.splice(0, 1, []);
            // console.log(123);
            saveOrderData(newOrderData);
            saveOrderLocation((newOrderData.length - 1));
        } else {
            // console.log($scope.orderItemData);
            // var element = $('.body .shopping_list tr');
            // var data = {};

            // data.id = +(uuid);
            // data.stats = 1;//待支付 1待支付 2已支付
            // data.payWay = $scope.payWay//支付方式 1微信 2支付宝 3云闪付
            // data.address = $scope.chooseAddress//收货地址
            // data.phone = $scope.choosePhone//手机号

            var order = [];
            $.each($scope.orderItemData, function (i, n) {
                // var id = toString(n.id);
                order.push({ id: n.id, number: n.number });
            });
            var data = { 'id': +(uuid), order, 'stats': 1, 'payWay': $scope.payWay, 'allprice': $scope.orderPrice, 'time': getTime() };
            // console.log(data);
            newOrderData.push(data);
            // newOrderData.splice(0, 1, []);
            // console.log(newOrderData);
            // console.log(123);
            saveOrderData(newOrderData);
            saveOrderLocation((newOrderData.length - 1));

        }
        window.location.href = 'pay.html';

    }
}]);




$(function () {
    // 地址信息

    // $('.body .receiver_info tbody>tr').first().children().eq(3).children().addClass('active');

    $('.body .receiver_info tbody').on('click', '.default', function () {
        // 切换默认地址
        $('.default>a').removeClass('active');
        $(this).children().addClass('active');
    });


    // 支付方式
    $('.body .pay_way button').click(function () {
        // 切换支付方式
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });


    // 编辑框
    $('.edit input').blur(function () {
        if ($(this).val() == '') {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
        // console.log($(this).val() == '');
    });
    $('.edit .modal').on('show.bs.modal', function () {
        document.body.parentNode.style.overflowY = 'hidden';
        $('.edit input').removeClass('is-valid').removeClass('is-invalid');
    });
    $('.edit .modal').on('hide.bs.modal', function () {
        document.body.parentNode.style.overflowY = 'auto';

    });

    haveToLogin();

});


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


function getTime() {
    var time = new Date();
    var mytime = time.toLocaleString();
    return mytime;
}