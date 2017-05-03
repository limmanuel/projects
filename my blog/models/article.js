var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	title:{
		type: String
	},
	subtitle:{
		type: String
	},
	category:{
		type: String
	},
	body:{
		type: String
	},
	author:{
		type: String
	},
	created_at:{
		type: Date,
		default: Date.now
	},
	comments:[{
			comment_subject:{
				type: String
			},
			comment_body:{
				type: String
			},
			comment_author:{
				type: String
			},
			comment_email:{
				type: String
			},
			comment_date:{
				type: String
			}
		}]
});

var article = module.exports = mongoose.model('Article', articleSchema);

module.exports.getArticles = function(callback, limit){
	Article.find(callback).limit(limit).sort([['title','ascending']]);
}


module.exports.addArticle = function(article, callback){
	Article.create(article,callback);
}

module.exports.getArticleById = function(id, callback){
	Article.findById(id, callback);
}

module.exports.updateArticle = function(query, update, options, callback){
	Article.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeArticle = function(query, callback){
	Article.remove(query, callback);
}