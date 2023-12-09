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
            btn.innerHTML = btn.innerHTML + `
            <button onclick="window.location.href='${btn_array[i].ways.href}'" type="button" class="btn btn-light btn-sm" style="color: ${btn_array[i].color};" data-bs-dismiss="${btn_array[i].ways.operate}">${btn_array[i].text}</button>
            `
        }
        $('#myModal').modal('show')
    }
}