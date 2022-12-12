import mongoose from "mongoose";
const KittySchema = new mongoose.Schema({
    name:String
})

const Kitten = mongoose.model('Kitten') || mongoose.model('Kitten',KittySchema)
export default Kitten