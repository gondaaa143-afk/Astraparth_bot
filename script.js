const tg = window.Telegram?.WebApp;

tg?.ready();
tg?.expand();

const user = tg?.initDataUnsafe?.user;
if (user && document.getElementById("username")) {
  document.getElementById("username").innerText = user.first_name;
}

let stack = ["home"];

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

window.openPage = function(id) {
  showPage(id);
  if (stack[stack.length - 1] !== id) stack.push(id);
  tg?.BackButton.show();
};

window.goBack = function() {
  if (stack.length > 1) stack.pop();
  const last = stack[stack.length - 1];
  showPage(last);
  if (last === "home") tg?.BackButton.hide();
};

tg?.BackButton.onClick(goBack);
tg?.BackButton.hide();
