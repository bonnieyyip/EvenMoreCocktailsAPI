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
    strDrinkThumb: {
        type: String,
        data: Buffer,
        required: true
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    }
});

PostSchema.virtual('idDrink').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
PostSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Posts', PostSchema);