const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    strDrink: {
        type: String,
        required: true
    },
    strInstructions: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});

PostSchema.method('transform', function() {
    var obj = this.toObject();

    //Rename fields
    obj.idDrink = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Posts', PostSchema);