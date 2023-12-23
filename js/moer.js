function Login() {
    console.log(555)
    $('#index_modal').modal('show')
}
let login = {
    title: "注册&登录",
    main: `
    <input type="name" class="form-control" id="login_name" placeholder="用户名">
    <br>
    <input type="password" class="form-control" id="iogin_pwd" placeholder="密码">
    `,
    btn: [{
        text: "注册",
        ways:
            { href: "#", operate: "modal", func: "alert('hhhh')" },
        color: "black"
    },
    {
        text: "取消",
        ways:
            { href: "#", operate: "modal", func: "" },
        color: "red"
    }
    ]
}
window.onload = function () {
    $('#index_modal').modal({
        backdrop: 'static',
        keyboard: false
    });

    ShowModal(login.btn, login.main, login.title)


}