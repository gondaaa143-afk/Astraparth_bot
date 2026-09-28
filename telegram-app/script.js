// ===== Astra Parth V2 =====

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// ---------- Haptic ----------
function haptic(type = "light") {
  tg.HapticFeedback?.impactOccurred(type);
}

// ---------- User ----------
let tgUser = tg.initDataUnsafe?.user || null;

// Fallback: initData se user nikaalo
if (!tgUser && tg.initData) {
  try {
    const params = new URLSearchParams(tg.initData);
    const rawUser = params.get("user");
    if (rawUser) tgUser = JSON.parse(rawUser);
  } catch (e) {
    console.log("User Parse Error:", e);
  }
}

// Profile name
if (tgUser && document.getElementById("username")) {
  document.getElementById("username").innerText = tgUser.first_name;
}

// ---------- Navigation ----------
const pages = ["home", "courses", "tests", "calendar", "profile"];
let stack = ["home"];

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const el = document.getElementById(page);
  if (el) el.classList.add("active");

  if (page === "home") {
    tg.BackButton.hide();
  } else {
    tg.BackButton.show();
  }
}

window.openPage = function (page) {
  haptic();

  if (!pages.includes(page)) return;

  if (stack[stack.length - 1] !== page) {
    stack.push(page);
  }

  showPage(page);
};

window.goBack = function () {
  haptic();

  if (stack.length > 1) {
    stack.pop();
  }

  showPage(stack[stack.length - 1]);
};

tg.BackButton.onClick(goBack);
tg.BackButton.hide();

// Continue Button
document.getElementById("continueBtn")?.addEventListener("click", () => {
  openPage("courses");
});

// Bottom Navigation
document.querySelectorAll("[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => {
    openPage(btn.dataset.nav);
  });
});

// Cards
document.querySelectorAll("[data-page]").forEach(card => {
  card.addEventListener("click", () => {
    openPage(card.dataset.page);
  });
});

// ---------- Save User ----------
async function saveUser() {

  if (!tgUser || !tgUser.id) {
    console.log("Telegram user not found");
    return;
  }

  try {

    const res = await fetch(CONFIG.EDGE_FUNCTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        telegram_id: tgUser.id,
        name: tgUser.first_name,
        username: tgUser.username || ""
      })
    });

    console.log("User Saved:", await res.json());

  } catch (err) {
    console.log("Save Error:", err);
  }

}

// ---------- Start ----------
setTimeout(() => {
  saveUser();
}, 500);
