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
            } else {
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
let Config
function getYm(end) {
    $.ajax({
        url: 'config.json',
        type: 'get',
        success: function (res) {
            console.log(res);
            Config = res
            try{
                end()
            }
            catch{
                console.log("已调用此函数，但没有回调运行")
            }
        }
    });

}


function initViewer() {
    // 设置viewer的配置
    const options = {
        url: "src",
        toolbar: false,
        navbar: false,
        title: false
    };

    // 获取所有class为img_true的img标签
    //const imgElements = document.querySelectorAll('#img');

    // 遍历每个img标签，为其添加点击事件
    imgElements.forEach(img => {
        img.addEventListener('click', function () {
            const viewer = new Viewer(this, options);
            viewer.show();
        });
    });
}

// 预览图片
function previewImage(imagePath) {
    const img = new Image();
    img.src = imagePath;

    // 等待图片加载完成后进行预览
    img.onload = function () {
        const options = {
            toolbar: false,
            navbar: false,
            title: false
        };

        const viewer = new Viewer(img, options);
        viewer.show();
    };
}

// 使用示例
// 加载viewer.js

// 初始化viewer，使所有class为img_true的img标签可以预览
document.addEventListener('DOMContentLoaded', initViewer);

// 调用预览图片函数，传入图片路径
//previewImage('path/to/image.jpg');

function setImgIds() {
    // 获取id为"main"的元素  
    var aa = document.getElementById("wiki_group");

    // 获取该元素下的所有img标签  
    var bb = aa.getElementsByTagName("img");

    // 为每个img标签添加onclick事件  
    for (var i = 0; i < bb.length; i++) {
        if (bb[i].id != "no_img") {
            bb[i].onclick = function () {
                previewImage(this.src); // 调用err函数并传入参数"s"  
            };
        }

    }
}
