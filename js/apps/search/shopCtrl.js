app.controller('shopCtrl', ['$scope', 'Search', '$filter', function ($scope, Search, $filter) {
    // 数据初始化
    $scope.shopDatas = getShopData();
    $scope.shopDefaultDatas = $filter("filter")($scope.shopDatas, Search.info);
    $scope.shopShowDatas = $filter("filter")($scope.shopDatas, Search.info);


    $scope.imgAddress = function (src) {
        return './img/' + src;
    };




    // 筛选
    $scope.class = 0;
    $scope.price = -1;
    $scope.filter_class = function (newclass) {
        $('.nothing').hide();
        $scope.class = newclass;
        console.log($scope.class);
        console.log($scope.price);
        $scope.shopShowDatas = filter($scope.shopDefaultDatas, $scope.class, $scope.price);


        if ($scope.shopShowDatas.length == 0) {
            $('.nothing').show()
        }
        // console.log($scope.shopShowDatas);
    }
    $scope.filter_price = function (newprice) {
        $('.nothing').hide();
        $scope.price = newprice;
        console.log($scope.class);
        console.log($scope.price);
        $scope.shopShowDatas = filter($scope.shopDefaultDatas, $scope.class, $scope.price);


        if ($scope.shopShowDatas.length == 0) {
            $('.nothing').show()
        }
        // console.log($scope.shopShowDatas);
    }


    // $scope.default = function () {
    //     $scope.shopShowDatas = $scope.shopDefaultDatas;
    // }
    // $scope.choose = function (char) {
    //     $scope.shopShowDatas = $scope.shopDefaultDatas;
    //     $scope.shopShowDatas = choose($scope.shopShowDatas, char);
    //     // console.log($scope.abc);
    // };
    // $scope.select = function (money) {
    //     $scope.shopShowDatas = $scope.shopDefaultDatas;
    //     $scope.shopShowDatas = select($scope.shopShowDatas, min, max);
    // }



    // 搜索
    $scope.searchInfo = '';
    $scope.search_info = function () {
        var data = JSON.parse(localStorage.getItem('user_login'));
        if (data == null) {
            alert('请先登录才可使用搜索功能');
        } else {
            $('.nothing').hide();
            $scope.shopDefaultDatas = $filter("filter")($scope.shopDatas, $scope.searchInfo);
            $scope.shopShowDatas = $scope.shopDefaultDatas;
            filterDefault();
            $scope.class = 0;
            $scope.price = -1;
        }

        if ($scope.shopShowDatas.length == 0) {
            $('.nothing').show()
        }
    }

}]);


$(function () {
    $('.nothing').hide();
})


// 筛选类别和金钱
function filter(data, newclass, newprice) {
    var newdata = [];
    // console.log('已收到');
    // console.log('newclass=' + newclass);
    // console.log('newprice=' + newprice);
    if (newclass == 0 && newprice == -1) {
        return data;
    } else if (newclass == 0 && newprice != -1) {
        if (newprice == 5) {
            var minPrice = newprice * 1000;
            var maxPrice = Number.MAX_VALUE;
        } else {
            var minPrice = newprice * 1000;
            var maxPrice = (newprice + 1) * 1000;
        }
        $.each(data, function (i, n) {
            if (n.price >= minPrice && n.price <= maxPrice) {
                newdata.push({ id: n.id, src: n.src, name: n.name, price: n.price, inCar: n.inCar });
            }
        });
        return newdata;
    } else if (newclass != 0 && newprice == -1) {
        $.each(data, function (i, n) {
            if (n.src[1] == newclass) {
                newdata.push({ id: n.id, src: n.src, name: n.name, price: n.price, inCar: n.inCar });
            }
        });
        return newdata;
    } else {
        if (newprice == 5) {
            var minPrice = newprice * 1000;
            var maxPrice = Number.MAX_VALUE;
        } else {
            var minPrice = newprice * 1000;
            var maxPrice = (newprice + 1) * 1000;
        }
        $.each(data, function (i, n) {
            if (n.src[1] == newclass && n.price >= minPrice && n.price <= maxPrice) {
                newdata.push({ id: n.id, src: n.src, name: n.name, price: n.price, inCar: n.inCar });
            }
        });
        return newdata;
    }
}
function filterDefault() {
    $('.body .table tbody tr a').removeClass('active');
    $('.body .table tbody tr:nth-child(1) td a:first-child').addClass('active');
    $('.body .table tbody tr:nth-child(4) td a:first-child').addClass('active');
}