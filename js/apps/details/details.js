var app = angular.module('app', []);
app.controller('mainCtrl', ['$scope', function ($scope) {
    // 加载商品信息
    $scope.shopDatas = getShopData();
    $scope.id = getDetailsData();
    getinfo();
    function getinfo() {
        $.each($scope.shopDatas, function (i, n) {
            if (n.id == $scope.id) {
                $scope.inCar = n.inCar
                $scope.name = n.name;
                $scope.price = n.price;
                $scope.src = n.src;
                console.log('getozaze!');
                return false;
            }
        });
    }
    $scope.imgAddress = function () {
        return './img/' + $scope.src;
    };


    // 加入购物车商品数目
    $scope.number = 1;
    $scope.add = function () {
        $scope.number = numberAdd($scope.number);
    }
    $scope.reduce = function () {
        $scope.number = numberReduce($scope.number);
    }
    $scope.number_check = function () {
        $scope.number = numberCheck($scope.number);
    }


    // 商品图片选择
    $scope.nowPicture = $scope.imgAddress();
    $scope.changePicture = function (src) {
        $scope.nowPicture = src;
    }

    // 评价区tap栏切换
    $scope.tap = function (index) {
        tap(index);
    }
}]);










$(function () {
    // 商品信息选择
    $('.body .shopping_choose a').click(function () {
        // console.log($(this).parent('.td').siblings());
        $(this).parent().siblings().children('a').removeClass('active');
        $(this).addClass('active');
    });

    // 图片选择播放
    $('.body .picture .picture_list_show li').mouseover(function () {
        $(this).siblings().children().removeClass('active');
        $(this).children().addClass('active');
    });
    $('.body .picture .picture_right').click(function () {
        $(this).parent().siblings("ul").children().css('cursor', 'pointer');
        var size = +($(this).parent().siblings("div").attr('data-size'));
        var length = +($(this).parent().siblings("div").attr('data-length'));
        if (size < length - 2) {
            var data = -105 * size;
            console.log(data);
            $(this).parent().siblings("div").children().css('transform', 'translateX(' + data + 'px)');
            size++;
            $(this).parent().siblings("div").attr('data-size', size);
            if (size == length - 2) {
                $(this).css('cursor', 'not-allowed');
            }
        }
    });
    $('.body .picture .picture_left').click(function () {
        $(this).parent().siblings("ul").children().css('cursor', 'pointer');
        var size = +($(this).parent().siblings("div").attr('data-size'));
        var length = +($(this).parent().siblings("div").attr('data-length'));
        if (size > 1) {
            var data = -105 * (size - 2);
            console.log(data);
            $(this).parent().siblings("div").children().css('transform', 'translateX(' + data + 'px)');
            size--;
            $(this).parent().siblings("div").attr('data-size', size);
            if (size == 1) {
                $(this).css('cursor', 'not-allowed');
            }
        }
    });



    // 加入|删除购物车
    $('.body .shopping_input .shopping_input_car').children().click(function () {
        // console.log(123);
        var id = $(this).attr('data-shopid');
        var number = $(this).parent().siblings().children().children('input').val();
        // console.log(number);
        var data = getShopData();
        var car = getCarData();
        if (data[id].inCar) {
            data[id].inCar = 0;
            car.splice(checkCarData(id), 1);
            saveCarData(car);
            console.log('已修改inCar为0');
        } else {
            data[id].inCar = 1;
            car.push({ 'id': id, 'number': number });
            saveCarData(car);
            console.log('已修改inCar为1');
        }
        saveShopData(data);



        let jump = $(this);
        let input = $(this).parent().siblings().children();
        let nojump = $(this).siblings();
        $(jump).toggleClass('jump_button');
        $(input).toggleClass('jump_button');
        setTimeout(function () {
            $(jump).toggleClass("jump_button");
            $(input).toggleClass('jump_button');
            $(jump).toggleClass("ng-hide");
            $(input).toggleClass("ng-hide");
            $(nojump).toggleClass("ng-hide");
        }, 750);
    });



});












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


// 商品数目加减法
function numberAdd(number) {
    number = Number(number);
    number += 1;
    number = numberCheck(number);
    return number;
}
function numberReduce(number) {
    number = +number;
    number--;
    number = numberCheck(number);
    return number;
}
function numberCheck(number) {
    number = +number;
    console.log(number);
    var element = $('.body .shopping_input .shopping_input_number input');
    if (number <= 1) {
        // alert('商品数不可为空或小于等于0');
        $(element).val(1);
        $(element).siblings(".reduce").children().css('cursor', 'not-allowed');
        $(element).siblings(".add").children().css('cursor', 'pointed');
        return 1;
    } else {
        // console.log($(element));
        // console.log($(element).siblings(".reduce"));
        $(element).siblings(".reduce").children().css('cursor', 'pointer');
        $(element).siblings(".add").children().css('cursor', 'pointed');
        return number;
    }
}


// 评价区tap切换
function tap(index) {
    // console.log(index);
    $('.body .container>.message>section>div').hide();
    $('.body .container>.message section div:nth-child(' + index + ')').show();
}