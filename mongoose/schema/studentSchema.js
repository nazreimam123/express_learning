import mongoose from 'mongoose';

const studentSchema= mongoose.Schema({
    name:String,
    age:Number,
    email:String,
},
{
    collection:'student'
}
)

export default studentSchema;