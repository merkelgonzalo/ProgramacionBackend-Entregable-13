import autopopulate from "mongoose-autopopulate";
import mongoose from "mongoose";

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        require: true
    }
});

messageSchema.virtual('userFirstName', {
        
    ref: 'users',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
    autopopulate: { select: 'first_name' }
});

messageSchema.plugin(autopopulate)

const messageModel = mongoose.model(messageCollection, messageSchema)
export default messageModel