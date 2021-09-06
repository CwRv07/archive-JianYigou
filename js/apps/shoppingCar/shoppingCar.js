var app = angular.module('app', []);


app.controller('mainCtrl', ['$scope', function ($scope) {
    // 页面初始化
    $scope.shopCarDatas = getCarItemData();
    $scope.imgAddress = function (src) {
        return './img/' + src;
    };


    // 删除购物车
    // $scope.delete = function (id) {
    //     deleteCarItemData(id);
    // }
}]);






$(function () {
    // getCarItemData();
    getSum();
    //单选框
    $(".danXuanKuang").each(function () {
        $(this).click(function () {
            if ($(this).attr("data-true") == 0) {
                $(this).attr("data-true", "1");
                $(this).css("background-image", "url('./img/danXuanKuang-1.png')");
                getSum();
            } else {
                $(this).attr("data-true", "0");
                $(this).css("background-image", "url(./img/danXuanKuang-0.png)");
                getSum();
            }
        });
    });
    $(".selection_all div").click(function () {
        if ($(this).attr("data-true") == 0) {
            $(this).attr("data-true", "1");
            $(this).css("background-image", "url('./img/danXuanKuang-1.png')");
            $(".danXuanKuang").each(function () {
                $(this).attr("data-true", "1");
                $(this).css("background-image", "url('./img/danXuanKuang-1.png')");
            });
            getSum();
        } else {
            $(this).attr("data-true", "0");
            $(this).css("background-image", "url(./img/danXuanKuang-0.png)");
            $(".danXuanKuang").each(function () {
                $(this).attr("data-true", "0");
                $(this).css("background-image", "url('./img/danXuanKuang-0.png')");
            });
            getSum();
        }
    });


    //删除
    $(".delete").click(function () {
        $(this).parent().parent().remove();
        var id = $(this).parents('tr').attr('data-shopid');
        deleteCarItemData(id);
        getSum()
    });

    $(".remove").click(function () {
        $(".danXuanKuang").each(function () {
            if ($(this).attr("data-true") == 1) {
                $(this).parent().parent().remove();
                var id = $(this).parents('tr').attr('data-shopid');
                deleteCarItemData(id);
            }
        });


        var element = $('.selection_all div')
        $(element).attr("data-true", "0");
        $(element).css("background-image", "url(./img/danXuanKuang-0.png)");

        getSum()
    });


    //数量加减按钮和输入框修改
    $(".add").click(function () {
        let n = $(this).siblings("input").val();
        n++;
        $(this).siblings("input").val(n);
        $(this).siblings(".reduce").removeClass("not_allowed");


        let price_one = parseFloat($(this).parents("td").siblings(".price_one_here").children().children().text());
        price_one *= n;
        $(this).parents("td").siblings(".price_here").children().children().text(price_one.toFixed(2));
        getSum()

    });
    $(".reduce").click(function () {
        let n = $(this).siblings("input").val();
        if (n == 2) {
            let n = $(this).siblings("input").val();
            n--;
            $(this).siblings("input").val(n);
            $(this).addClass("not_allowed");


            let price_one = parseFloat($(this).parents("td").siblings(".price_one_here").children().children().text());
            price_one *= n;
            $(this).parents("td").siblings(".price_here").children().children().text(price_one.toFixed(2));
            getSum()
        } else if (n > 2) {
            let n = $(this).siblings("input").val();
            n--;
            $(this).siblings("input").val(n);


            let price_one = parseFloat($(this).parents("td").siblings(".price_one_here").children().children().text());
            price_one *= n;
            $(this).parents("td").siblings(".price_here").children().children().text(price_one.toFixed(2));
            getSum()
        } else { };
    });
    $(".shop_number").change(function () {
        let n = $(this).val();
        let price_one = parseFloat($(this).parents("td").siblings(".price_one_here").children().children().text());
        price_one *= n;
        $(this).parents("td").siblings(".price_here").children().children().text(price_one.toFixed(2));
        getSum();
    });


    //计算函数
    function getSum() {
        $('.nothing').hide()
        if ($('.page').length == 0) {
            console.log('芜湖');
            $('.nothing').show();
            return;
        }


        let number = 0;
        let count = 0.00;
        $(".page").each(function () {
            if ($(this).children("td:first").children().attr("data-true") == 1) {
                number += parseInt($(this).children("td:nth-child(4)").children().children("input").val());
                count += parseFloat($(this).children(".price_here").children().children().text());
            }
        });
        $(".selection_number").children().children().text(number);
        $(".price_all").children().children().text(count.toFixed(2));
        //结账按钮颜色
        if (number == 0) {
            $(".shoppingCar_bottom .right button").css({
                "backgroundColor": "rgb(176,176,176)",
                "cursor": "not-allowed",
            });
        } else {
            $(".shoppingCar_bottom .right button").css({
                "backgroundColor": "rgb(255,69,0)",
                "cursor": "pointer"
            });
        }
    }


    //结账按钮
    $('.shoppingCar_footer .right button').click(function () {
        var order = [];
        var element = $('.page');
        $.each(element, function (i, n) {
            if ($(n).children("td").first().children().attr('data-true') == 1) {
                order.push({ 'id': $(n).attr('data-shopid'), 'number': $(n).children().eq(3).children().children("input").val() })
            }
        });
        // console.log(order.length);
        if (order.length == 0) {
            return;
        } else {
            var orderdata = getOrderData();
            var uuid = Math.round(Math.random() * 100000000000);
            var data = { 'id': uuid, order };
            // console.log(data);
            orderdata.splice(0, 1, data);
            saveOrderData(orderdata);
        }
        window.location.href = './order.html';
    });

    haveToLogin();
});





// 获取购物车数据
function getCarItemData() {
    var newdata = [];
    var carData = getCarData();
    var shopData = getShopData();
    $.each(carData, function (i, n) {
        var id = +(n.id);
        var data = shopData.slice(id, id + 1);
        shopData[id].number = n.number;
        newdata.push(shopData[id]);
    });
    // console.log(newdata);
    return newdata;
}


// 删除购物车数据
function deleteCarItemData(id) {
    // var data = getCarItemData();

    // 购物车本次存储修改
    var carData = getCarData();
    carData.splice(checkCarData(id), 1);
    // console.log(carData);
    saveCarData(carData);


    // 商品本地存储修改
    // console.log(id);
    var shopData = getShopData();
    // console.log(checkShopData(id));
    shopData[checkShopData(id)].inCar = 0;
    // console.log(shopData);
    saveShopData(shopData);

    //修改数据 
    // if (id == 0) {
    //     data.shift();
    //     return data;
    // } else {
    //     $.each(data, function (i, n) {
    //         if (n.id == id) {
    //             data.splice(i, 1);
    //         }
    //     });
    //     return data;
    // }
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
