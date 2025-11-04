import mongoose from "mongoose"
const QuizSchema = new mongoose.Schema({
    question:{type:String,required:true},
    options:[{type:String,required:true}],
    correctAns:{type:Number,required:true}
})

const Quiz = mongoose.model("quiz", QuizSchema)

export default Quiz