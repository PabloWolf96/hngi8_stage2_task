const menu = document.getElementById("menu");
const header = document.querySelector("header");
const submit = document.querySelector("#submit");
const msg = document.querySelector("#msg");
const sendIcon = document.querySelector("#send-icon");
const upArrow = document.querySelectorAll("[href='#home']")[1];
menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  header.classList.toggle("toggle");
});
["scroll", "load"].forEach((e) => {
  window.addEventListener(e, () => {
    menu.classList.remove("fa-times");
    header.classList.remove("toggle");
    const top = document.querySelector(".top");
    if (window.scrollY > 0) {
      top.style["display"] = "block";
    } else {
      top.style["display"] = "none";
    }
  });
});

submit.addEventListener("click", async () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const title = document.querySelector("#title").value;
  const message = document.querySelector("#message").value;
  if (!name || !email || !title || !message) {
    notification("You must provide name, title, email and message", "red");
    clearInputs();
  }
  try {
    const data = await fetch("/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        title,
        message,
      }),
    });
    sendIcon.className = "fas fa-check";
    const resp = await data.json();
    if (data.ok) {
      notification(resp.msg, "green");
    } else {
      msg.className = "";

      notification(resp.msg, "red");
    }
  } catch (error) {
    console.log(error);
  }
});

function notification(str, color) {
  msg.className = "box";
  msg.textContent = str;
  msg.style["background-color"] = color;
  clearInputs();
  setTimeout(() => {
    msg.textContent = "";
    msg.className = "";
    sendIcon.className = "fas fa-paper-plane";
  }, 2000);
}
function clearInputs() {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const title = document.querySelector("#title");
  const message = document.querySelector("#message");
  name.value = "";
  email.value = "";
  title.value = "";
  message.value = "";
}
upArrow.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
