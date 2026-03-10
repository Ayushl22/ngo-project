const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/register",(req,res)=>{
    res.render("auth/register");
});

router.post("/register",async(req,res)=>{
    try{
        let {username,email,password} = req.body;

        const user = new User({username,email});

        const registeredUser = await User.register(user,password);

        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            res.redirect("/events");
        });

    }catch(e){
        res.send(e.message);
    }
});

router.get("/login",(req,res)=>{
    res.render("auth/login");
});

router.post("/login",
passport.authenticate("local",{failureRedirect:"/login"}),
(req,res)=>{
    res.redirect("/events");
});

router.get("/logout",(req,res)=>{
    req.logout(()=>{
        res.redirect("/");
    });
});

module.exports = router;