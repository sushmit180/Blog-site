const express=require("express");
const nodemon = require("nodemon");
const app=express();
const port=8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const {v4:uuidv4}=require('uuid');
let posts=[
    {
        id:uuidv4(),
        username:"sj",
        content:"love fuck",
    },
    {
        id:uuidv4(),
        username:"ayush",
        content:"dont do sex in the morning",

    }
];

app.listen(port,()=>{
    console.log("listening");
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let newid=uuidv4();
    posts.push({id:newid,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params
    res.render("change.ejs",{id})
})
app.post("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let {newcontent}=req.body;
    let post=posts.find((p)=>id==p.id);
    post.content=newcontent;
    res.redirect("/posts");
    
})
app.get("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});
