var express = require('express');
var router = express.Router();

Article = require('../models/article.js');

router.get('/', function (req,res,next){
	Article.getArticles(function(err,art){
		if(err){
			res.send(err);
		}
			res.render('articles', {
			title: 'Articles',
			articles: art
		});
	});
});

router.get('/show/:id', function (req,res,next){
	res.render('article', {
		title: 'Article'
	});
});

router.get('/category/:category_id', function (req,res,next){
	res.render('articles', {
		title: 'Category Articles'
	});
});

router.post('/add', function(req,res,next){
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('subtitle', 'Subtitle is required').notEmpty();
	req.checkBody('category', 'Category is required').notEmpty();
	req.checkBody('author', 'Author is required').notEmpty();
	req.checkBody('body', 'Body is required').notEmpty();

	let errors = req.validationErrors();

	let article = new Article();
	article.title = req.body.title;
	article.subtitle = req.body.subtitle;
	article.category = req.body.category;
	article.body = req.body.body;
	article.author = req.body.author;

	if(errors){
		Category.getCategories(function(err,cat){
			res.render('add_article', {
				errors: errors,
				categories: cat,
				title: 'Create Article'
			});
		});
	} else {
		Article.addArticle(article, function(err,art){
			if(err){
				res.send(err);
			}
			req.flash('success', 'Article Saved');
			res.redirect('/manage/articles')
		})
	}
})

router.post('/edit/:id', function(req,res,next){
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('subtitle', 'Subtitle is required').notEmpty();
	req.checkBody('category', 'Category is required').notEmpty();
	req.checkBody('author', 'Author is required').notEmpty();
	req.checkBody('body', 'Body is required').notEmpty();

	let errors = req.validationErrors();

	let article = new Article();
	var query = {_id: req.params.id};
	var update = {
	title: req.body.title,
	subtitle: req.body.subtitle,
	category: req.body.category,
	body: req.body.body,
	author: req.body.author
	}

	if(errors){
		Category.getCategories(function(err,cat){
			res.render('add_article', {
				errors: errors,
				categories: cat,
				title: 'Create Article'
			});
		});
	} else {
		Article.updateArticle(query, update, {}, function(err,cat){
			if(err){
				res.send(err);
			}
			req.flash('success', 'Article Updated');
			res.redirect('/manage/articles')
		})
	}
})

router.delete('/delete/:id', function(req,res,next){
	var query = {_id: req.params.id};
	console.log(query);

	Article.removeArticle(query, function(err,art){
		if(err){
			res.send(err);
		}
		res.status(200);
	})
})
module.exports = router;