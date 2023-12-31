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
        let urldata = getUrlParams("page")
        if (urldata == undefined || urldata == "home") {
            $("#home").show()
            $.ajax({
                url: window.localStorage.getItem("ym") + "getStatistics",
                type: 'post',
                success: function (res) {
                    if (res.message == "success") {
                        document.getElementById('downs').innerHTML = res.dons
                        document.getElementById('users').innerHTML = res.users
                        document.getElementById('wzs').innerHTML = res.wzs
                        document.getElementById('ggs').innerHTML = res.ggs
                        
                    }
                }
            });
        } else if (urldata == "gg") {
            $("#gg").show()
            GetGG()
        }else if (urldata == "wiki") {
            $("#wiki").show()
            wikiIndex()
        }
    }



}
let wikiData = ''
function goPage(page) {
    wikiData = page 
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="wikiIndex()" class="container"><a class="navbar-brand"href="#"><img src="../img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: window.localStorage.getItem("ym") + "getWikiList",
        type: 'post',
        success: function (res) {
            $('#wiki_group').append(`<div id="wiki_wk" class="list-group"></div>`)
            for (let i = 0; i < res.main.length; i++) {
                if (res.main[i].wiki == page) {
                    for (let j = 0; j < res.main[i].article.length; j++) {
                        //console.log(res.main[i].article[j].title)
                        $('#wiki_wk').append(`
			<a onclick="toWz('${page}','${res.main[i].article[j].title}')" class="list-group-item list-group-item-action">${res.main[i].article[j].title}</a>`)

                    }
                }
            }
            $('#wiki_group').append(`
            <div class="d-grid gap-2 col-6 mx-auto">
            <button onclick="pushArticle()" type="button" class="btn btn-primary btn-sm">添加文章</button>
</div>`)
        }
    });
}

function wikiIndex() {
    document.getElementById('wiki_group').innerHTML = ""
    $.ajax({
        url: window.localStorage.getItem("ym") + "getWikiList",
        type: 'post',
        success: function (res) {
            for (let i = 0; i < res.main.length; i++) {
                //console.log(res.main[i])

                $('#wiki_group').prepend(`<div class="card" onclick="goPage('${res.main[i].wiki}')">
            <p style="font-family: hmos;" class="card-title"> ${res.main[i].wiki}</p>
            <div class="go-corner">
                <div class="go-arrow">→</div>
            </div>
        </div>`)
            }
            $('#wiki_group').append(`
            <div class="d-grid gap-2 col-6 mx-auto">
            <button onclick="$('#newWiki_modal').modal('show')" type="button" class="btn btn-primary btn-sm">添加百科</button>
</div>`)
        }
    });
}

function toWz(w, z) {
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="goPage('${w}')" class="container"><a class="navbar-brand"href="#"><img src="../img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: window.localStorage.getItem("ym") + "getWikiArticle",
        type: 'post',
        data: JSON.stringify({
            "for_wiki": w,
            "title": z
        }),
        success: function (res) {
            $('#wiki_group').append(res.main)
        }
    });
}

const E = window.wangEditor;
let editor = new E("#bj");
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
                $("#recommend_list").empty()
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
                    //$("#recommend_list").empty()
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

document.getElementById("newWiki_modall").addEventListener("click",function(){
    $.ajax({
        url: window.localStorage.getItem('ym') + "admin/newWiki",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "admin_name": window.localStorage.getItem("admin_name"),
            "admin_pwd": window.localStorage.getItem("admin_pwd"),
            "name":$("#wikiGroupName").val()
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "新建百科板块："+$("#wikiGroupName").val()+"成功！")
                $("#newWiki_modal").modal("hide");
            } else {
                err("e", res.message)
            }
            wikiIndex()
        }
    });
})


function pushArticle() {
    editor.destroy()
    editor = new E("#wz");
    editor.create()
    $("#newWikiArt_modal").modal("show")
}

function pushArticle2(){
    $.ajax({
        url: window.localStorage.getItem('ym') + "admin/newWikiArticle",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "admin_name": window.localStorage.getItem("admin_name"),
            "admin_pwd": window.localStorage.getItem("admin_pwd"),
            "title":$("#wztit").val(),
            "for_wiki":wikiData,
            "main":editor.txt.html()
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
                err("s", "发布文章："+$("#wikiGroupName").val()+"在"+wikiData+"板块中，成功！")
                $("#newWikiArt_modal").modal("hide");
            } else {
                err("e", res.message)
            }
            wikiIndex()
        }
    });
}