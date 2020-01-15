const name = prompt("Enter your nick name");

// Init socket.io
const socket = io("http://localhost:8000");

// Elements
const messages = document.querySelector(".messages"),
  msg = document.getElementById("message"),
  toast = document.querySelector(".toast");

// Connected
socket.emit("connected", name);

// Message received
socket.on("message", msg => {
  appendMessage(msg.text, msg.name, "received");
  // console.log(msg);
});

// Another user joined
socket.on("user-connected", name => {
  showToast(`${name} has joined`);
});

// User leaved
socket.on("user-disconnected", function(name) {
  console.log(name);
  showToast(`${name} leaved`);
});

// Form submit/ message sent
document.getElementById("send-message").addEventListener("submit", e => {
  e.preventDefault();
  // Broadcast message

  if (msg.value !== "") {
    socket.emit("message", msg.value);
    appendMessage(msg.value, "You", "sent");
    msg.value = "";
  } else {
    return false;
  }
});

// Append message
function appendMessage(msg, user_name, class_name) {
  let message = document.createElement("div");
  message.classList.add(class_name);
  message.innerHTML = `
    <span class="username">${user_name}</span>
    <br/>
    ${msg}
  `;
  messages.appendChild(message);
  window.scrollTo(0, messages.scrollHeight);
}

// Notification
function showToast(msg) {
  toast.innerHTML = msg;
  toast.classList.add("show-top");
  setTimeout(() => {
    toast.classList.remove("show-top");
  }, 3000);
}

window.onload = msg.focus();
