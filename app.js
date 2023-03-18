const express = require("express");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config()

// Set up the server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files 
app.use(express.static("public"));

// Use session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddleware);
io.use((socket, next) =>
  sessionMiddleware(socket.request, socket.request.res, next)
);

// Define the fast foods and order history
const menuList = {
  2: "Roasted Lamb Chops",
  3: "Grilled Beef Ribs",
  4: "Grilled Fish",
  5: "Suya"
};
const orderHistory = [];




// Define the socket.io event listeners to connect
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Define the bot message function
  const sendBotMessage = (message) => {
    socket.emit("bot-message", message);
  };

  // Ask for the user's name
  sendBotMessage("Hello! What's your name?");


  // Define the user name
  let userName = "";

  // Listen for incoming user messages
  socket.on("user-message", (message) => {
    console.log("User message received:", message);

    if (!userName) {
      // Save the user's name and update the welcome message
      userName = message;
      sendBotMessage(
        `Welcome to the Grilz 'n' Barz, ${userName}!
        Select 1 to place order 
        Select99 to checkout order. 
        Select 98 to see order History. 
        Select 97 to view current order. 
        Select 0 to Cancel order`
      );
    } else {
      switch (message) {
        case "1":
          // Generate the list of items dynamically
          const itemOptions = Object.keys(menuList)
            .map((key) => `${key}. ${menuList[key]}`)
            .join("\n");
          sendBotMessage(
            `Here is a list of items you can order: ${itemOptions} Please select one by typing its number.`
          );
          break;
        case "2":
        case "3":
        case "4":
        case "5":
          // Parse the number from the user input and add the corresponding item to the current order
          const selectedIndex = parseInt(message);
          if (menuList.hasOwnProperty(selectedIndex)) {
            const selectedItem = menuList[selectedIndex];
            socket.request.session.currentOrder.push(selectedItem);
            sendBotMessage(
              `${selectedItem} has been added to your order. Do you want to add more items to your order?. If not, type 99 to checkout.`
            );
          } else {
            sendBotMessage("Invalid selection.");
          }
          break;
        case "99":
          if (socket.request.session.currentOrder.length === 0) {
            sendBotMessage("No order to place. select 1 to See menu");
          } else {
            orderHistory.push(socket.request.session.currentOrder);
            sendBotMessage("Order placed");
            socket.request.session.currentOrder = [];
          }
          break;
        case "98":
          if (orderHistory.length === 0) {
            sendBotMessage("No previous orders");
          } else {
            const orderHistoryString = orderHistory
              .map((order, index) => `Order ${index + 1}: ${order.join(", ")}`)
              .join("\n");
            socket.emit(
              "bot-message",
              `Here is your order history: ${orderHistoryString}`
            );
          }
          break;

        case "97":
          if (socket.request.session.currentOrder.length === 0) {
            sendBotMessage("No current order. send 1 See menu");
          } else {
            const currentOrderString =
              socket.request.session.currentOrder.join(", ");
            sendBotMessage(`Here is your current order: ${currentOrderString}`);
          }
          break;
        case "0":
          socket.request.session.currentOrder = [];
          sendBotMessage("Order cancelled. Send 1 to See menu");
          break;
        default:
          sendBotMessage("Invalid selection. Please try again.");
          break;
      }
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () =>{
    console.log('server running on :5000')
})
