import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ucSchema = new Schema({
    title: {type:String,unique:true},
});

const UC = model('ucs', ucSchema);
export default UC;