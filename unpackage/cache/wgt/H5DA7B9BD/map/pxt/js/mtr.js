// 220612a

const jUrl = "mailto:sierra@qinxr.cn";

document.getElementById("msg_cap").style.cssText = "font-size: 30px;font-weight: bold;";
document.getElementById("msg_subCap").style.cssText = "font-size: 24px;";
document.getElementById("msg_txt").style.cssText =
    "text-align: justify;font-size: 20px;max-width: 450px;margin-top: 40px;margin-bottom: 30px;";
document.getElementById("msg_no").style.cssText =
    "font-size: 24px;font-weight: bold;border: 4px solid #003380;border-radius: 6px;margin: 0 auto;padding: 10px;width: 240px;";
document.getElementById("msg_yes").style.cssText =
    "font-size: 16px;margin: 0 auto;margin-top: 15px;width: -webkit-fit-content;border-bottom: 2px solid #003380;";

document.body.onclick = function(evt) {
    if (evt.target != document.getElementsByClassName("msg_Div")[0] && evt.target.id.indexOf("msg_") < 0) {
        document.getElementsByClassName("msg_Div")[0].style.display = "none";
        document.body.onclick = null;
    }
};

<p id="fh"></p>

<script>
function myFunction() {
  document.getElementById("fh").innerHTML = "Hello World";
}
document.getElementById("msg_no").onclick = function() {
    document.getElementsByClassName("msg_Div")[0].style.display = "none";
    document.body.onclick = null;
};

document.getElementById("msg_yes").onclick = function() {
    window.open(jUrl);
    document.getElementsByClassName("msg_Div")[0].style.display = "none";
    document.body.onclick = null;
};

var msg_timer_count = 10;

function autoHideMsgBox() {
    if (msg_timer_count > 0) {
        msg_timer_count--;
    } else {
        clearInterval(msg_timer);
        document.getElementsByClassName("msg_Div")[0].style.display = "none";
        document.body.onclick = null;
    }
};

var msg_timer = setInterval("autoHideMsgBox()", 1000);