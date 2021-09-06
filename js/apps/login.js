
$(function () {
    //检测是否登录账号函数
    login_user_info()
    /* 登录页面-start */

    // 登录判断
    $('header .login .login_enter').click(function () {
        $('header .login .login_message small').css('display', 'none');

        var user_name = $('header .login form .form-group:nth-child(1) input').val();
        var user_password = $('header .login form .form-group:nth-child(2) input').val();

        if (user_name.length == 0 || user_password.length == 0) {
            $('header .login .login_message small:nth-child(3)').css('display', 'block');
        } else if (login_check(user_name, user_password) == 0) {
            $('header .login .login_message small:nth-child(2)').css('display', 'block');

        } else if (login_check(user_name, user_password) == 1) {
            $('header .login .login_message small:nth-child(1)').css('display', 'block');

        } else {
            localStorage.setItem('user_login', JSON.stringify([{ name: user_name }]));
            $('#login_modal').modal('hide');
            login_user_info();
            $('.login_enter_modal .modal-body').text('欢迎用户<' + user_name + '>的登录');
            $('#login_enter_modal').modal('show');
            setTimeout(function () {
                location.reload();
            }, 2000);
        };
    });

    // 退出登录
    $('.login_exit_modal .login_exit_buton').click(function () {
        localStorage.removeItem("user_login");
        login_user_info();
    });

    /* 登录页面-end */





    /* 注册页面-start */

    //账号正误验证
    $('.register .modal-body .form-group:nth-child(1) input').blur(function () {
        if ($(this).val().length == 0) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $(this).siblings('small').css('display', 'none');
        } else if (UserData_check($(this).val())) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            $(this).siblings('small').css('display', 'block');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            $(this).siblings('small').css('display', 'none');
        }

    });

    //密码正误验证(密码/重复密码)
    $('.register .modal-body .form-group:nth-child(2) input').blur(function () {
        if ($(this).val().length == 0) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
        if ($('.register .modal-body .form-group:nth-child(3) input').val().length != 0) {
            $('.register .modal-body .form-group:nth-child(3) input').blur();
        }
    });
    $('.register .modal-body .form-group:nth-child(3) input').blur(function () {
        let input_mima = $(this).parents('form').children('.form-group:nth-child(2)').children();
        if (input_mima.hasClass('is-valid')) {
            if ($(this).val() == $(input_mima).val()) {
                $(this).removeClass('is-invalid');
                $(this).addClass('is-valid');
            } else {
                $(this).removeClass('is-valid');
                $(this).addClass('is-invalid');
            }
        }
    });

    //验证码
    $('.register .modal-body .form-group:nth-child(4) input').blur(function () {
        if ($(this).val().length == 0) {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        }
    });
    $('.register form .form-group:nth-child(4) button').click(function () {
        $(this).siblings('input').val(yanZhengMa());
        $(this).siblings('input').blur();
    });
    function yanZhengMa() {
        var yanZhengMa = Math.random();
        yanZhengMa = yanZhengMa * 349525 + 699050;
        yanZhengMa = Math.floor(yanZhengMa);
        yanZhengMa = Number.parseInt(yanZhengMa, 10).toString(16);
        return yanZhengMa;
    }

    //协议同意
    $('.register .modal-body .form-group:nth-child(5) input').click(function () {
        $(this).toggleClass('is-valid');
    });

    //注册按钮判断和处理
    $('header .register .modal-footer button:nth-child(1)').click(function () {
        if ($('.register form .form-group:nth-child(1) input').hasClass('is-valid') &&
            $('.register form .form-group:nth-child(2) input').hasClass('is-valid') &&
            $('.register form .form-group:nth-child(3) input').hasClass('is-valid') &&
            $('.register form .form-group:nth-child(4) input').hasClass('is-valid') &&
            $('.register form .form-group:nth-child(5) input').hasClass('is-valid')) {
            var local = getUserData();
            local.push({ name: $('.register form .form-group:nth-child(1) input').val(), password: $('.register form .form-group:nth-child(2) input').val() });
            saveUserData(local);
            localStorage.setItem('user_login', JSON.stringify([{ name: $('.register form .form-group:nth-child(1) input').val() }]));
            login_user_info();
            $('.login_enter_modal .modal-body').text('欢迎用户<' + $('.register form .form-group:nth-child(1) input').val() + '>的登录');
            $('#register_modal').modal('hide')
            $('#login_enter_modal').modal('show');
            setTimeout(function () {
                location.reload();
            }, 2000);

        } else {
            alert('请依次正确完成以上项目');
        }
    })
    /* 注册页面-end */





});



//获取本地账号数据
function getUserData() {
    var data = localStorage.getItem('user_info');
    if (data != null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

//存入本地账号数据
function saveUserData(local) {
    localStorage.setItem('user_info', JSON.stringify(local));
}

// 检测账号密码是否正确
function login_check(user_name, user_password) {
    var data = getUserData();
    var yes = 0;
    $.each(data, function (i, n) {
        if (n.name == user_name) {
            yes = 1;
            if (n.password == user_password) {
                yes = 2;
                return false;
            }
        }
    })
    return yes;
}
//检测账号重复
function UserData_check(name) {
    var data = getUserData();
    let yes = 0;
    $.each(data, function (i, n) {
        if (n.name == name) {
            yes = 1;
            return false;
        }
    });
    return yes;
}

//检测账号登录情况
function login_user_info() {
    var data = JSON.parse(localStorage.getItem('user_login'));
    if (data != null) {
        $('header .login_state .noLogin').hide();
        $('header .login_state .hasLogin').show();
        $('header .login_state .user_name>a').text(data[0].name)
    } else {
        $('header .login_state .noLogin').show();
        $('header .login_state .hasLogin').hide();
    }
}

// 强制当前页面登录
function haveToLogin() {
    setTimeout(function () {
        var data = JSON.parse(localStorage.getItem('user_login'));
        if (data == null) {
            $('#login_modal').modal('show');
            setTimeout(function () {
                alert('对不起，需登录才有权限访问该页面');
            }, 400);

        }
    }, 400);
}
