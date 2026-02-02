import mongoose from "mongoose"
const quizSchema = new mongoose.Schema({
    question:{type:String,required:true},
    options:[{type:String,required:true}],
    correctAns:{type:Number,required:true}
})

const quiz = mongoose.model("quiz", quizSchema)

export default quiz