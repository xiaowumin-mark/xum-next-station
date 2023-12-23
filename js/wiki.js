window.onload = function () {
    wikiIndex()


}

function goPage(page) {
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="wikiIndex()" class="container"><a class="navbar-brand"href="#"><img src="./img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: './dataTest/wiki.json',
        type: 'get',
        success: function (res) {
            $('#wiki_group').append(`<div id="wiki_wk" class="list-group"></div>`)
            for (let i = 0; i < res.wz_list.length; i++) {
                if (res.wz_list[i].wiki == page) {
                    for (let j = 0; j < res.wz_list[i].list.length; j++) {
                        console.log(res.wz_list[i].list[j].title)
                        $('#wiki_wk').append(`
			<a onclick="toWz('${page}','${res.wz_list[i].list[j].title}')" class="list-group-item list-group-item-action">${res.wz_list[i].list[j].title}</a>`)

                    }
                }
            }
        }
    });
}

function wikiIndex() {
    document.getElementById('wiki_group').innerHTML = ""
    $.ajax({
        url: './dataTest/wiki.json',
        type: 'get',
        success: function (res) {
            for (let i = 0; i < res.wz_list.length; i++) {
                console.log(res.wz_list[i])

                $('#wiki_group').prepend(`<div class="card" onclick="goPage('${res.wz_list[i].wiki}')">
            <p style="font-family: hmos;" class="card-title"> ${res.wz_list[i].wiki}</p>
            <div class="go-corner">
                <div class="go-arrow">→</div>
            </div>
        </div>`)
            }
        }
    });
}

function toWz(w, z) {
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="goPage('${w}')" class="container"><a class="navbar-brand"href="#"><img src="./img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: './dataTest/wiki.json',
        type: 'get',
        success: function (res) {
            for (let i = 0; i < res.wz_list.length; i++) {
                if (res.wz_list[i].wiki == w) {
                    for (let j = 0; j < res.wz_list[i].list.length; j++) {
                        if (res.wz_list[i].list[j].title == z) {
                            console.log(res.wz_list[i].list[j].main)
                            $('#wiki_group').append(res.wz_list[i].list[j].main)
                        }
                    }
                }
            }
        }
    });
}