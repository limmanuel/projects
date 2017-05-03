var express = require('express');
var router = express.Router();

Category = require('../models/category.js');
Article = require('../models/article.js');

router.get('/articles', function (req,res,next){
	Article.getArticles(function(err,art){
		if(err){
			res.send(err);
		}
			res.render('manage_articles', {
			title: 'Articles',
			articles: art
		});
	});
});

router.get('/categories', function (req,res,next){
	Category.getCategories(function(err,cat){
		if(err){
			res.send(err);
		}
		res.render('manage_categories', {
			title: 'Categories',
			categories: cat
		});
	});
});

router.get('/articles/add',function(req,res,next){
	Category.getCategories(function(err,categories){
		if(err){
			res.send(err);
		}
		res.render('add_article', {
			title: 'Create Article',
			categories: categories
		});
	});
})

router.get('/categories/add',function(req,res,next){
	res.render('add_category', {
		title: 'Create Category'
	});
})

router.get('/articles/edit/:id', function (req,res,next){
	Article.getArticleById(req.params.id, function(err,art){
		if(err){
			res.send(err);
		}
		Category.getCategories(function(err,cat){
			if(err){
				res.send(err);
			}
			res.render('edit_article', {
			title: 'Edit Article',
			categories: cat,
			article: art});
		});
	});
});

router.get('/categories/edit/:id', function (req,res,next){
	Category.getCategoryById(req.params.id, function(err,cat){
		if(err){
			res.send(err);
		}
		res.render('edit_category', {
			title: 'Edit Categories',
			category: cat
		});
	})
});

module.exports = router;