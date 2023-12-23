function ShowModal(btn_array, main_text, main_title) {
    if (typeof (jQuery) == "undefined") {
        alert("jQuery is not imported");
    } else {
        let tit = document.getElementById('ModalTitle')
        let main = document.getElementById('ModalMain')
        let btn = document.getElementById('ModalBtn')
        tit.innerText = main_title
        main.innerHTML = main_text
        for (var i = 0; i < btn_array.length; i++) {
            if (btn_array[i].ways.func == '') {
                btn.innerHTML = btn.innerHTML + `
            <button onclick="window.location.href='${btn_array[i].ways.href}'" type="button" class="btn btn-light btn-sm" style="color: ${btn_array[i].color};" data-bs-dismiss="${btn_array[i].ways.operate}">${btn_array[i].text}</button>
            `
            }else{
                btn.innerHTML = btn.innerHTML + `
            <button onclick="${btn_array[i].ways.func}" type="button" class="btn btn-light btn-sm" style="color: ${btn_array[i].color};" data-bs-dismiss="${btn_array[i].ways.operate}">${btn_array[i].text}</button>
            `
            }

        }
        $('#myModal').modal('show')
    }
}

function err(h, test) {
    let toastLiveExample = document.getElementById('liveToast')
    let toast = new bootstrap.Toast(toastLiveExample)
    if (h == 's') {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-primary border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    } else {
        document.getElementById('liveToast').className = 'toast align-items-center text-bg-danger border-0'
        document.getElementById('Err_p').innerHTML = test
        toast.show()
    }

}

function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
    var url = window.location.search;
    if (url.indexOf('?') == 1) { return false; }
    url = url.substr(1);
    url = url.split('&');
    var name = name || '';
    var nameres;
    // 获取全部参数及其值
    for (var i = 0; i < url.length; i++) {
        var info = url[i].split('=');
        var obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
    }
    // 如果传入一个参数名称，就匹配其值
    if (name) {
        for (var i = 0; i < url.length; i++) {
            for (const key in url[i]) {
                if (key == name) {
                    nameres = url[i][key];
                }
            }
        }
    } else {
        nameres = url;
    }
    // 返回结果
    return nameres;
}