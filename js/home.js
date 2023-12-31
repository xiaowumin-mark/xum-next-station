window.onload = function () {
    getYm()
    if (window.localStorage.getItem("if_login") == null) {
        ShowModal(login.btn, login.main, login.title)
    }
    if (window.localStorage.getItem("if_one") == null) {
        setTimeout(function () {
            $.ajax({
                url: window.localStorage.getItem("ym") + "addDone",
                type: 'post'
            });
        }, 1000);

        window.localStorage.setItem("if_one", false)

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

    setTimeout(function () {
        $("#recommend_list").empty()
        $.ajax({
            url: window.localStorage.getItem('ym') + "getGG",
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
    }, 1000)
    
}