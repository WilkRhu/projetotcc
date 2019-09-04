const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var Float = require('mongoose-float').loadType(mongoose);


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    weigth: {
        type: String,
        required: false,
    },
    lote: {
        type: String,
        required: false,
    },
    mark: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false,
    },
    quantiti: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

ProductSchema.plugin(mongoosePaginate);

mongoose.model('Product', ProductSchema);