var wechatModal = document.getElementById("WeChatMod");
var wechatBtn = document.querySelectorAll('[id="WeChatBtn"]');

for (var i = 0; i < wechatBtn.length; i++) {
  wechatBtn[i].onclick = function () {
    wechatModal.style.display = "block";
  };
}

window.onclick = function (event) {
  if (event.target == wechatModal) {
    wechatModal.style.display = "none";
  }
};
