window.onload = function () {
    getYm()
    if (window.localStorage.getItem("if_login") == null) {
        ShowModal(login.btn, login.main, login.title)
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
}