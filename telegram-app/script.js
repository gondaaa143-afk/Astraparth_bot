const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const username = document.getElementById("username");

const user = tg.initDataUnsafe?.user;

if(user){
  username.textContent =
    `${user.first_name}${user.last_name ? " " + user.last_name : ""}`;
}else{
  username.textContent = "Telegram User Not Found";
}
