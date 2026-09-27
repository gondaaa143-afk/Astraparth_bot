Telegram.WebApp.ready();
Telegram.WebApp.expand();

function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
