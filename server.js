const express = require("express")
const hbs = require("hbs")
const fs = require("fs")
const path = require('path');

// Alternative for port
const port = process.env.PORT || 3000;


var app = express()

app.set("view engine","hbs")
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static(__dirname + "/public"))  


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url} ${req.protocol} ${req.hostname}`

    console.log(log)
    fs.appendFile("server.log",log + '\n',(err) => {
        if(err) {
            console.log("unable to append log file")
        }
    })
    next()
})

// middleware 
// app.use((req,res,next) => {
//     res.render("maintenance.hbs")
// })


hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

hbs.registerHelper("Screamit",(text) => {
    return text.toUpperCase();
})
// app.get('/',(req,res) => {
//     // res.send("<h1>Hello Server</h1>")
//     res.send({
//         Name : "Mahesh",
//         Likes : [
//             "Biking",
//             "FootBall"
//         ]
//     })
// })

app.get("/",(req,res) => {
    res.render("home.hbs",{
        pageTitle: "Home Page",
        welcomeNote: "Welcome to Home island",
        // Current_year: new Date().getFullYear()
    })
})

// app.get("/about",(req,res) => {
//     res.send("<h1>About Page</h1>")
// })

app.get("/about",(req,res) => {
    res.render("about.hbs",{
        pageTitle: "About Page",
        // Current_year: new Date().getFullYear()
    })
})

app.get("/projects",(req,res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects"
    })
})

app.get("/bad",(req,res) => {
    res.send({
        errorMessage: "unable to handle request"
    })
})

app.get("/help",(req,res) => {
    res.sendFile(path.join(__dirname+"/public/help.html"))
})

// app.listen(3000,()=>{
//     console.log("server is up")
// })

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})