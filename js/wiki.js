window.onload = function () {
    getYm(wikiIndex)
    //setTimeout(wikiIndex,1000)
    //wikiIndex()


}

function goPage(page) {
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="wikiIndex()" class="container"><a class="navbar-brand"href="#"><img id="no_img" src="./img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: Config.ym + Config.routes[10],
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
        }
    });
}

function wikiIndex() {
    document.getElementById('wiki_group').innerHTML = ""
    $.ajax({
        url: Config.ym + Config.routes[10],
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
        }
    });
}

function toWz(w, z) {
    
    document.getElementById('wiki_group').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div onclick="goPage('${w}')" class="container"><a class="navbar-brand"href="#"><img id="no_img" src="./img/svg/return.svg"alt="Bootstrap"width="30"height="24"></a></div></nav>`
    $.ajax({
        url: Config.ym+ Config.routes[11],
        type: 'post',
        data: JSON.stringify({
            "for_wiki": w,
            "title": z
        }),
        success: function (res) {
            $('#wiki_group').append(res.main)
            setImgIds()
        }
    });
}