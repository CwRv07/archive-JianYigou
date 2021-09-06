$(function () {
    //tap栏切换



    //模态框对滑动条修改+输入框清空
    $('header .modal').on('show.bs.modal', function () {
        document.body.parentNode.style.overflowY = 'hidden';
        $('.modal input').val('');
        $('input').removeClass('is-valid').removeClass('is-invalid');
    })
    $('header .modal').on('hide.bs.modal', function () {
        document.body.parentNode.style.overflowY = 'auto';
        $('input').removeClass('is-valid').removeClass('is-invalid');
        // setTimeout(function () {
        //     $('.modal input').val('');
        // }, 400)
    })


    //加入|删除购物车
    // $('.item').on('click', '.row:nth-child(n+2) .card-button', function () {

    //     let id = $(this).parents('.card').attr('data-shopid');
    //     var data = getShopData();
    //     if (data[id].inCar) {
    //         data[id].inCar = 0;
    //     } else {
    //         data[id].inCar = 1;
    //     }
    //     saveShopData(data);


    //     let number = CarData_check(($(this).parents('.card').children('img').attr('src')).substring(6))
    //     if (number == 0) {
    //         //加入购物车列表
    //         let jump = $(this)

    //         $(this).toggleClass("jump_button");

    //         var local = getCarData();
    //         local.push({
    //             src: ($(this).parents('.card').children('img').attr('src')).substring(6),
    //             name: $(this).parents('.card-body').children('.card-title').text(),
    //             price: ($(this).parents('.card-body').children('.card-text').text()).substring(1)
    //         })
    //         saveCarData(local);
    //         setTimeout(function () {
    //             $(jump).toggleClass("jump_button");
    //             $(jump).toggleClass("ng-hide");
    //             $(jump).siblings('.card-button').toggleClass("ng-hide");
    //         }, 700);
    //     } else {
    //         //删除购物车列表
    //         let jump = $(this)
    //         $(this).toggleClass("jump_button");

    //         var local = getCarData();
    //         local.splice((number - 1), 1);
    //         saveCarData(local);

    //         setTimeout(function () {
    //             $(jump).toggleClass("jump_button");
    //             $(jump).toggleClass("ng-hide");
    //             $(jump).siblings('.card-button').toggleClass("ng-hide");
    //         }, 700);
    //     }

    // });


});