const express = require("express");
const router = express.Router();
const Event = require("../models/event");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
};

router.get("/events",async(req,res)=>{
    const events = await Event.find({});
    res.render("events/index",{events});
});

router.get("/events/new", isLoggedIn, (req,res)=>{
    res.render("events/new");
});

router.post("/events", isLoggedIn, async(req,res)=>{
    const event = new Event(req.body.event);
    await event.save();
    res.redirect("/events");
});

router.get("/events/:id",async(req,res)=>{
    const event = await Event.findById(req.params.id);
    res.render("events/show",{event});
});

router.get("/events/:id/edit",async(req,res)=>{
    const event = await Event.findById(req.params.id);
    res.render("events/edit",{event});
});

router.put("/events/:id",async(req,res)=>{
    await Event.findByIdAndUpdate(req.params.id,req.body.event);
    res.redirect(`/events/${req.params.id}`);
});

router.delete("/events/:id",async(req,res)=>{
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/events");
});

module.exports = router;