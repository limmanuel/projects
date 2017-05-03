var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	title:{
		type: String
	},
	description:{
		type: String
	}
});

var category = module.exports = mongoose.model('Category', categorySchema);

module.exports.getCategories = function(callback, limit){
	Category.find(callback).limit(limit).sort([['title','ascending']]);
}


module.exports.addCategory = function(category, callback){
	Category.create(category,callback);
}

module.exports.getCategoryById = function(id, callback){
	Category.findById(id, callback);
}

module.exports.updateCategory = function(query, update, options, callback){
	Category.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeCategory = function(query, callback){
	Category.remove(query, callback);
}