var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
    status: String,
    itemList: []
});

module.exports = mongoose.model('Order', OrderSchema);