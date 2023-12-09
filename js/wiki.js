window.onload = function () {

    $.ajax({
        url: './dataTest/wiki.json',
        type: 'get',
        success: function (res) {
            for (let i = 0; i < res.wz_list.length; i++) {
                console.log(res.wz_list[i])

                $('#wiki_group').prepend(`<div class="card" onclick="location.href = 'wiki.html?page=${res.wz_list[i].wiki}'">
            <p style="font-family: hmos;" class="card-title"> ${res.wz_list[i].wiki}</p>
            <div class="go-corner">
                <div class="go-arrow">→</div>
            </div>
        </div>`)
            }
        }
    });
}