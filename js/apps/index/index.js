var app = angular.module('app', []);


app.controller('mainCtrl', ['$scope', function ($scope) {

}])



$(function () {


    //渲染本地商品
    getShopData();



    // 响应式完善
    window.onresize = function () {
        if (document.body.clientWidth < 768 && document.body.clientWidth >= 576) {
            $('.navbar-nav .nav-item:nth-child(2)').hide();
        } else if (document.body.clientWidth >= 768) {
            $('.navbar-nav .nav-item:nth-child(2)').show();
        } else if (document.body.clientWidth < 576 && document.body.clientWidth >= 450) {
            $('.navbar-nav .nav-item:nth-child(2)').show();
            $('.navbar-nav').css('flex-direction', 'row');
        } else if (document.body.clientWidth < 450) {
            $('.navbar-nav .nav-item:nth-child(2)').hide();
            $('.navbar-nav').css('flex-direction', 'row');
        }
    };




    //tap栏切换
    $('.item .nav .nav-item').click(function () {
        var nav_item = $(this).attr('data-nav_item');

        $('.item .nav .nav-item').children('.nav-link').removeClass("active");
        // $('.item .nav .nav-item').children('.nav-link').css('');
        let i = 1;
        for (; i <= 3; i++) {
            $('.item .nav .nav-item:nth-child(' + i + ')').children('.nav-link').css('background-image', 'url("./img/' + $('.item .nav .nav-item:nth-child(' + i + ')').children('.nav-link').attr('data-background') + '0_icon.png")');
        };


        $(this).children('.nav-link').addClass('active');
        $(this).children('.nav-link').css('background-image', 'url("./img/' + $(this).children('.nav-link').attr("data-background") + '1_icon.png")')

        $('.item .row:nth-child(n+2)').hide();
        $('.item .row:nth-child(' + nav_item + ')').show();
    });


    //加入/删除购物车
    // $('.item .row:nth-child(n+2) .card-button').click(function () {
    //     let number = CarData_check(($(this).parents('.card').children('img').attr('src')).substring(6))
    //     if (number == 0) {
    //         //加入购物车列表
    //         let jump = $(this)
    //         $(this).toggleClass("jump_button");
    //         setTimeout(function () {
    //             $(jump).toggleClass("jump_button");
    //             $(jump).children('a').toggleClass("btn-primary");
    //             $(jump).children('a').toggleClass("btn-danger");
    //             if ($(jump).children('a').text() == '加入购物车') {
    //                 $(jump).children('a').text('已加入成功');
    //             } else {
    //                 $(jump).children('a').text('加入购物车');
    //             }
    //         }, 700);

    //         var local = getCarData();
    //         local.push({
    //             src: ($(this).parents('.card').children('img').attr('src')).substring(6),
    //             name: $(this).parents('.card-body').children('.card-title').text(),
    //             price: ($(this).parents('.card-body').children('.card-text').text()).substring(1)
    //         })
    //         console.log(local);
    //         // saveCarData(local);
    //     } else {
    //         //删除购物车列表
    //         let jump = $(this)
    //         $(this).toggleClass("jump_button");
    //         setTimeout(function () {
    //             $(jump).toggleClass("jump_button");
    //             $(jump).children('a').toggleClass("btn-primary");
    //             $(jump).children('a').toggleClass("btn-danger");
    //             if ($(jump).children('a').text() == '加入购物车') {
    //                 $(jump).children('a').text('已加入成功');
    //             } else {
    //                 $(jump).children('a').text('加入购物车');
    //             }
    //         }, 700);

    //         var local = getCarData();
    //         local.splice((number - 1), 1);
    //         saveCarData(local);
    //     }
    // });








});
