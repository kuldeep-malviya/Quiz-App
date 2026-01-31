import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import "./model/qns-model.js"
import admin from "./routes/admin-routes.js";
import quiz from "./routes/quiz-routes.js";
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

//  set ejs open 
app.set("view engine", "ejs")
// set ejs close 
app.use("/admin", admin)
app.use("/quiz",quiz)
const port = process.env.PORT || 4001;

// connect mongoDb open 
async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017/quizDb")
}
connectDb()

// connect mongoDb close 




app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/Quiz",(req,res)=>{
    res.render("quiz")
})
app.get("/Admin",(req,res)=>{
    res.render("admin")
})

app.listen(port,()=>{
    console.log(`server is running at http://localHost:${port}`)
    
})

