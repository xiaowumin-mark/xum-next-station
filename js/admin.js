window.onload = function(){
    if(window.localStorage.getItem("admin_name") == null  || window.localStorage.getItem("admin_pwd") == null){
        location.href = "index.html"
    }
    if(getUrlParams("page") == undefined || getUrlParams("page") == "home"){
        $("#home").show()
    }else if(getUrlParams("page") =="gg"){
        $("#gg").show()
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
                        <img class="box_top_linesvg" src="../img/svg/gg.svg" alt="" srcset="">
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
    }

    
}


const { createEditor, createToolbar } = window.wangEditor

const editorConfig = { MENU_CONF: {} }
editorConfig.placeholder = '公告内容'

editorConfig.onChange = (editor) => {
	const htmll = editor.getHtml()
	console.log(htmll)
	// 也可以同步到 <textarea>
	document.getElementById("htmlGG").innerHTML = htmll
}
editorConfig.MENU_CONF['uploadImage'] = {
	// 上传图片的配置
	server: 'http://localhost/api/bfsd/disk/upimg',
	fieldName: 'your-custom-name',

	// 单个文件的最大体积限制，默认为 2M
	maxFileSize: 1 * 1024 * 1024, // 1M

	// 最多可上传几个文件，默认为 100
	maxNumberOfFiles: 1,

	// 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
	allowedFileTypes: ['image/*'],

	// 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
	
	// 将 meta 拼接到 url 参数中，默认 false
	metaWithUrl: false,

	// 自定义增加 http  header
	

	// 跨域是否传递 cookie ，默认为 false
	withCredentials: true,

	// 超时时间，默认为 10 秒
	timeout: 5 * 1000, // 5 秒
}

const editor = createEditor({
	selector: '#editor-container',
	html: '<p><br></p>',
	config: editorConfig,
	mode: 'default', // or 'simple'
})

const toolbarConfig = {}



const toolbar = createToolbar({
	editor,
	selector: '#toolbar-container',
	config: toolbarConfig,
	mode: 'simple', // or 'simple'
})


function goGG(){
    $.ajax({
        url: window.localStorage.getItem('ym') + "admin/publishGG",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "admin_name":window.localStorage.getItem("admin_name"),
            "admin_pwd":window.localStorage.getItem("admin_pwd"),
            "main":document.getElementById("htmlGG").innerHTML,
            "title":$("#GGtit").val(),
        }),
        success: function (res) {
            //console.log(res);
            if (res.message == "success") {
               alert(5)
                
            } else {
                alert(res.message)
            }
        }
    });
}