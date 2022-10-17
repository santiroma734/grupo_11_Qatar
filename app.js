const express = require("express");
const app = express();
const path = require("path");
const mainRoutes = require('./src/routes/mainRoutes')

app.use(express.static("public"));

app.listen(3030, () => {
  console.log("Servidor funcionando");
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/views/index.html"));
// });

app.use('/', mainRoutes)

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/views/register.html"));
});

app.get("/pedido", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/productCart.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/productos", (req, res) => {
  res.sendFile(__dirname + "/views/productos.html");
});

app.get("/detalle-producto", (req, res) => {
  res.sendFile(__dirname + "/views/productDetail.html");
});
