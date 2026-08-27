import mongoose from 'mongoose';

export default studentSchema= mongoose.Schema({
    name:String,
    age:Number,
    email:String,
})