const socket = io();

// Query DOM elements
const inputFBox = document.getElementById("inputBox");
const messages = document.getElementById("messages");

// Helper function to append a message to the chat box
function appendMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-text", sender);
  messageElement.textContent = message;
  
  const timestamp = new Date().toLocaleTimeString(); // create timestamp
  const timestampElement = document.createElement("span"); // create span element for timestamp
  timestampElement.classList.add("timestamp");
  timestampElement.textContent = timestamp;
  
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(timestampElement);
  messages.appendChild(messageContainer);
  messages.scrollTop = messages.scrollHeight;
}

// Handle sending messages
function sendMessage() {
  const message = inputBox.value.trim();
  if (message === "") {
    return;
  }
  appendMessage(message, "user");
  socket.emit("user-message", message);
  inputBox.value = "";
}

// Handle receiving messages from the server
socket.on("bot-message", (message) => {
  appendMessage(message, "bot");
});

// Attach event listeners
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
});

document.getElementById("sendButton").addEventListener("click", sendMessage);

document.getElementById("inputBox").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});