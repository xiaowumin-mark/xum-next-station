window.onload = function () {
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $.ajax({
        url: './modal.json',
        type: 'get',
        success: function (res) {
            if (res.v !== app_version) {
                ShowModal(res.btn, res.main, res.title)
            }
        }
    });
}