const express = require("express");
const userRoute = require("./Routes/userRoute");
const connectDb = require("./configuration/DB");
const cors = require("cors"); 
const dotenv = require("dotenv");
const productRoute = require("./Routes/productRoute");
const purchaseRoute = require("./Routes/purchasesRoute");
const messagesRoutes = require("./Routes/messagesRoutes");

const http = require("http"); // required for socket.io
const { Server } = require("socket.io");
const { saveMessage } = require("./Controllers/messagesController");

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDb();

app.use(cors()); 
app.use(express.json());

const server = http.createServer(app); // for socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/api", userRoute, productRoute, purchaseRoute, messagesRoutes);

const onlineUsers = new Map();

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Register user and store their socket ID
  socket.on("register_user", (userId) => {
    console.log(`User ${userId} registered with socket ${socket.id}`);
    onlineUsers.set(userId, socket.id); // Add the user to the map
  });

  // Handle sending messages
  socket.on("send_message", async (data) => {
    try {
      // Save the message to the database first
      const message = await saveMessage(data); // Assume this function saves the message and returns it

      // Find the receiver's socket ID
      const receiverSocketId = onlineUsers.get(data.receiverId);
      if (receiverSocketId) {
        // Emit the message to the receiver
        io.to(receiverSocketId).emit("receive_message", message);
        console.log("Message sent:", message);
      } else {
        console.log("Receiver is not online");
      }
    } catch (err) {
      console.error("Error saving message:", err.message);
    }
  });

  // Remove user from onlineUsers when they disconnect
  socket.on("disconnect", () => {
    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
