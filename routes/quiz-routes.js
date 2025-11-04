import express from "express"
import Quiz from "../model/qns-model.js"

const quiz = express.Router()

quiz.get("/", async (req,res)=>{
   const questions =  await Quiz.aggregate([{$sample:{size:5}}])
    res.render("quiz",{questions})
   
}  
)

quiz.post("/submit", async (req,res) => {
    const userAns = req.body;
    let score = 0 ;
    for (const key in userAns) {
       let q = await Quiz.findById(key)
       if (q.correctAns == parseInt(userAns[key])) {
            score++
       }     
    }
    res.render("result", {score, total:Object.keys(userAns).length})
})
export default quiz