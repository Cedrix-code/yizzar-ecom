const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/order", (req, res) => {
  console.log("Order received:", req.body);
  res.json({ message: "Order placed successfully!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
