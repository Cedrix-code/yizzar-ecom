require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripe = require("stripe");

const app = express();
app.use(express.json());
app.use(cors());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ Order Schema
const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [{ name: String, price: Number, quantity: Number }],
  total: Number,
  stripePaymentId: String,
});
const Order = mongoose.model("Order", OrderSchema);

// ✅ Middleware: Authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// ✅ Register
app.post("/api/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// ✅ Place Order (Protected)
app.post("/api/order", authenticate, async (req, res) => {
  try {
    const { items, total, token } = req.body;

    // ✅ Process Payment
    const payment = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      source: token.id,
      description: "E-commerce Order Payment",
    });

    // ✅ Save Order
    const order = new Order({ userId: req.user.userId, items, total, stripePaymentId: payment.id });
    await order.save();

    res.json({ message: "Order placed successfully!", paymentId: payment.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get User Orders (Protected)
app.get("/api/orders", authenticate, async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId });
  res.json(orders);
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
