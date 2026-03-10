const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(session({
    secret:"secretcode",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const authRoutes = require("./routes/auth");
app.use("/",authRoutes);

const eventRoutes = require("./routes/events");
app.use("/",eventRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/ngo-platform");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("home");
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});

