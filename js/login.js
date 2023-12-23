let login = {
    title: "注册&登录",
    main: `
    <input type="name" class="form-control" id="login_name" placeholder="用户名">
    <br>
    <input type="phone" class="form-control" id="login_phone" placeholder="手机号">
    <br>
    <input type="password" class="form-control" id="login_pwd" placeholder="密码">
    `,
    btn: [{
        text: "注册",
        ways:
            { href: "#", operate: "", func: "userSignup()" },
        color: "black"
    },
    {
        text: "登录",
        ways:
            { href: "#", operate: "modal", func: "userLogin()" },
        color: "black"
    }
    ]
}

function userLogin(){// 处理用户登录操作
    let userName = $("#login_name").val();
    let userPhone = $("#login_phone").val();
    let userPwd = $("#login_pwd").val();
    $.ajax({
        url: window.localStorage.getItem('ym') + "api/users/login",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "user_name":userName,
            "user_pwd":userPwd,
            "user_phone":userPhone
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "登录成功~")
                window.localStorage.setItem("user_pwd",res.main.user_pwd)
                window.localStorage.setItem("user_phone", res.main.user_phone)
                window.localStorage.setItem("user_name",res.main.user_name)
                window.localStorage.setItem("if_login",true)
            } else {
                err("e", res.message)
            }
        }
    });
}

function userSignup(){// 处理用户注册操作
    let userName = $("#login_name").val();
    let userPhone = $("#login_phone").val();
    let userPwd = $("#login_pwd").val();
    $.ajax({
        url: window.localStorage.getItem('ym') + "api/users/signup",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "user_name":userName,
            "user_pwd":userPwd,
            "user_phone":userPhone
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "注册成功，请手动登录呦~")
            } else {
                err("e", res.message)
            }
        }
    });
}