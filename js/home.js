window.onload = function () {
    getYm(function () {
        if (window.localStorage.getItem("if_login") == null) {
            ShowModal(login.btn, login.main, login.title)
        } else if (window.localStorage.getItem("if_one") == null) {
            setTimeout(function () {
                $.ajax({
                    url: Config.ym + Config.routes[0],
                    type: 'post'
                });
            }, 1000);

            window.localStorage.setItem("if_one", false)
        } else {
            $.ajax({
                url: Config.ym + Config.routes[3],
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "user_name": window.localStorage.getItem("user_name"),
                    "user_pwd": window.localStorage.getItem("user_pwd"),
                    "user_phone": window.localStorage.getItem("user_phone"),
                    "type":true
                }),
                success: function (res) {
                    //console.log(res);
                    if (res.message == "success") {
                        console.log("通过验证")
                    } else {
                        err("e", "账户不存在，即将清除数据！！")
                        setTimeout(function () {
                            window.localStorage.removeItem("user_name")
                            window.localStorage.removeItem("user_pwd")
                            window.localStorage.removeItem("user_phone")
                            window.localStorage.removeItem("if_login")
                            location.reload();
                        }, 2000)
                    }
                }
            });
        }

        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        });

        $.ajax({
            url: './dataTest/modal.json',
            type: 'get',
            success: function (res) {
                if (res.v !== app_version) {
                    ShowModal(res.btn, res.main, res.title)
                }
            }
        });


        $("#recommend_list").empty()
        $.ajax({
            url: Config.ym + Config.routes[12],
            type: 'post',
            success: function (res) {
                //console.log(res);
                if (res.message == "success") {
                    for (var i = 0; i < res.main.length; i++) {
                        $("#recommend_list").prepend(`
                        <div class="recommend_list_box">
                    <div class="box_top">
                        <!--
                            <div class="box_top_line">
        
                            </div>
                            -->
                        <img class="box_top_linesvg" src="./img/svg/gg.svg" alt="" srcset="">
                        <div>
                            <p class="line_p">
                                新公告：${res.main[i].Title}
                            </p>
                        </div>
    
                    </div>
                    
                    <div style="padding: 20px;">
                    ${res.main[i].Main}
                    </div>
                        
    
                    
                </div>`)
                    }
                } else {
                    err("e", res.message)
                }
            }
        });

    })


}