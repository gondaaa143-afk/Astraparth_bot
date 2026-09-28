const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

const user = tg?.initDataUnsafe?.user;
if(user){
  document.getElementById("username").textContent = user.first_name;
}

const pages = document.querySelectorAll(".page");
const stack = ["home"];

function show(id){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

window.openPage = function(id){
  if(stack[stack.length-1]!==id) stack.push(id);
  show(id);
  tg?.BackButton?.show();
}

window.goBack = function(){
  if(stack.length>1) stack.pop();
  const last = stack[stack.length-1];
  show(last);
  if(last==="home") tg?.BackButton?.hide();
}

document.getElementById("continueBtn").onclick = ()=>openPage("courses");

document.querySelectorAll("[data-page]").forEach(c=>{
  c.onclick=()=>openPage(c.dataset.page);
});

document.querySelectorAll("[data-nav]").forEach(b=>{
  b.onclick=()=>openPage(b.dataset.nav);
});

document.querySelectorAll(".back-btn").forEach(b=>{
  b.onclick=goBack;
});

tg?.BackButton?.onClick(goBack);
tg?.BackButton?.hide();
