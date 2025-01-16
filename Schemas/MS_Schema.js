import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const msSchema = new Schema({
    msNumber: { type: Number, unique: true },
});

const MS = model('mss', msSchema);
export default MS;