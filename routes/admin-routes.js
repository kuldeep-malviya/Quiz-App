import express from "express"
import mongoose from "mongoose"
import Quiz from "../model/qns-model.js"
const admin = express.Router()

const app = express()

admin.get("/", async (req, res) => {
    const questions = await Quiz.find()
    res.render("admin",{questions})
})

admin.get("/add-qsn", (req, res) => {
    res.render("add-questions")
})
admin.post("/add", async (req, res) => {
    const { question, option1, option2, option3, option4, correct } = req.body
    await Quiz.create({
        question,
        options: [option1, option2, option3, option4],
        correctAns: correct
    })
    res.redirect("/admin")
})

admin.post("/rm-qsn/:id",async (req,res) => {
    try {
        const id = req.params.id
        await Quiz.findByIdAndDelete(id)
        res.redirect("/admin")
    } catch (error) {
        console.log(error)
    }
    
})

export default admin;