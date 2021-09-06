var app = angular.module('app', []);
app.factory('Search', function () {
    var obj = {};
    obj.abc = 'abc';
    return obj;
});
app.controller('mainCtrl', ['$scope', function ($scope) {
}]);




$(function () {
    // 加入|删除购物车
    $('.list').on('click', '.card .button>div', function () {
        // console.log(123);
        var id = $(this).parents('.card').attr('data-shopid');
        var data = getShopData();
        var car = getCarData();
        if (data[id].inCar) {
            data[id].inCar = 0;
            car.splice(checkCarData(id), 1);
            saveCarData(car);
            console.log('已修改inCar为0');
        } else {
            data[id].inCar = 1;
            car.push({ 'id': id, 'number': 1 });
            saveCarData(car);
            console.log('已修改inCar为1');
        }
        saveShopData(data);

        let jump = $(this);
        $(this).toggleClass('jump_button');
        setTimeout(function () {
            $(jump).toggleClass("jump_button");
            $(jump).toggleClass("ng-hide");
            $(jump).siblings('div').toggleClass("ng-hide");
        }, 750);
    });

    // table tap栏切换
    $('.body .table tbody tr a').click(function () {
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');
    });

    //详情页跳转
    $('.body .list .item').on('click', '.col-3', function () {
        var id = $(this).children('.card').attr('data-shopid');
        saveDetailsData(id);
    })
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
