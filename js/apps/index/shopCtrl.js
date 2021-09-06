app.controller('shopCtrl', ['$scope', function ($scope) {
    // $scope.shopDatas = getShopData();

    $scope.shopShowDatas = getShopShowData();
    $scope.imgAddress = function (src) {
        return './img/' + src;
    };
    $scope.addCar = function () {
        //     // $scope.shopShowDatas = getShopData();
        //     alert('addCar已启动');
    };
}]);

// 随机四个商品
function getShopShowData() {
    var shopDatas = getShopData();
    var shopShowDatas = [];
    var choose = Math.round(Math.random() * 4 - 0.5)
    $.each(shopDatas, function (i, n) {
        if (i % 4 == choose) {
            shopShowDatas.push({ id: n.id, src: n.src, name: n.name, price: n.price, inCar: n.inCar })
        }
    })
    console.log(shopDatas);
    console.log(shopShowDatas);
    return shopShowDatas;
}


$(function () {
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



    //详情页跳转
    $('.body .list .item').on('click', '.col-3', function () {
        var id = $(this).children(".card").attr('data-shopid');
        // var id = $(this).children().children().attr('data-shopid');
        saveDetailsData(id);
    })
});



function saveDetailsData(id) {
    localStorage.setItem('details_location', id);
}