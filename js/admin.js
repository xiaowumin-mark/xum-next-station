window.onload = function () {
    if (window.localStorage.getItem("admin_name") == null || window.localStorage.getItem("admin_pwd") == null) {
        location.href = "index.html"
    } else {
        $.ajax({
            url: window.localStorage.getItem("ym") + "api/users/adminLogin",
            type: 'post',
            data: {
                admin_name: window.localStorage.getItem("admin_name"),
                admin_pwd: window.localStorage.getItem("admin_pwd")
            },
            success: function (res) {
                if (res.message != "success") {
                    window.localStorage.removeItem("admin_name")
                    window.localStorage.removeItem("admin_pwd")
                    err("e", "后端已更改管理员信息，即将在3s后重新登录！")
                    setTimeout(function () {
                        location.href = "index.html"
                    }, 3000)
                }
            }
        });
        if (getUrlParams("page") == undefined || getUrlParams("page") == "home") {
            $("#home").show()
        } else if (getUrlParams("page") == "gg") {
            $("#gg").show()
            GetGG()
        }
    }



}


const E = window.wangEditor;
const editor = new E("#bj");
//editor.config.height = 800;

// 过滤样式，默认 true
editor.config.pasteFilterStyle = true;

// 忽略图片，默认 false
editor.config.pasteIgnoreImg = false;

editor.config.pasteTextHandle = function (content) {
    print(content)
    return content; //  返回 content 为处理后的内容

};

editor.create();



function goGG() {
    $.ajax({
        url: window.localStorage.getItem('ym') + "admin/publishGG",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "admin_name": window.localStorage.getItem("admin_name"),
            "admin_pwd": window.localStorage.getItem("admin_pwd"),
            "main": editor.txt.html(),
            "title": $("#GGtit").val(),
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "发布公告成功！")
                GetGG()
                $("#GGmodal").modal("hide");
            } else {
                err("e", res.message)
            }
        }
    });
}


function GetGG() {
    $.ajax({
        url: window.localStorage.getItem('ym') + "getGG",
        type: 'post',
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                for (var i = 0; i < res.main.length; i++) {
                    $("#recommend_list").prepend(`
                    <tr id="GGmainBox${res.main[i].Id}"><td><div class="recommend_list_box"id="GGbox${res.main[i].Id}"><div class="box_top"><!--<div class="box_top_line"></div>--><img class="box_top_linesvg"src="../img/svg/gg.svg"alt=""srcset=""><div><p class="line_p">新公告：${res.main[i].Title}</p></div></div><div style="padding: 20px;">${res.main[i].Main}</div></div></td><td><button type="button"class="btn btn-outline-danger" onclick="delGG(${res.main[i].Id})">删除</button></td></tr>
                    `)
                }
            } else {
                err("e", res.message)
            }
        }
    });
}


function delGG(id) {
    $.ajax({
        url: window.localStorage.getItem('ym') + "admin/delGG",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "admin_name": window.localStorage.getItem("admin_name"),
            "admin_pwd": window.localStorage.getItem("admin_pwd"),
            "id": id
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "删除公告成功！")
                $(`#GGmainBox${id}`).hide(500)
                setTimeout(function () { $(`#GGmainBox${id}`).remove() }, 500)

            } else {
                err("e", res.message)
            }
        }
    });
}