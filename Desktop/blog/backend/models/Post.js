const { Schema, model } = require("mongoose"); 

const PostSchema = Schema({ 
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    posted: {
        type: Date, 
        required:true
    },
    image: {
        type: String, 
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
}); 


PostSchema.method("toJSON", function() {
    const {__v, _id, ...object} = this.toObject(); 
    object.id = _id; 
    return object;
}); 

module.exports = model("Post", PostSchema);