const express = require("express");
const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.send("Inventory API is Running");
});


app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});