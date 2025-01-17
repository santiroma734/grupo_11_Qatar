const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const mainRoutes = require("./src/routes/mainRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const productCartRoutes = require("./src/routes/productCartRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const apiRoutes = require("./src/routes/api/apiRoutes");
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMw = require("./src/middlewares/userLoggedMw");
///////////////////////////////

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// expiración de la sesión = 4 horas
app.use(
  session({
    secret: "OrsaiSession",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 1000 * 60 * 60 * 4 },
  })
);
app.use(cookies());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/src/views"));
app.use(express.static(path.join(__dirname + "/public")));

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
app.use(userLoggedMw);
app.use("/", mainRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/order", productCartRoutes);
app.use("/products", productsRoutes);
app.use("/api", apiRoutes);
