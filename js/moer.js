window.onload = function () {
    if (window.localStorage.getItem("if_login") == null) {
        ShowModal(login.btn, login.main, login.title)
    }else{
        $("#user_name").html(window.localStorage.getItem("user_name"))
        $("#user_phone").html(window.localStorage.getItem("user_phone"))    }
    $('#index_modal').modal({
        backdrop: 'static',
        keyboard: false
    });

    


}