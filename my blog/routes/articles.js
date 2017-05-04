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
	Article.getArticleById(req.params.id, function(err,art){
		if(err){
			res.send(err);
		}
			res.render('article', {
			title: 'Article',
			article: art
		});
	});
});

router.get('/category/:category_id', function (req,res,next){
	Article.getCategoryArticle(req.params.category_id, function(err,art){
		Category.getCategoryById(req.params.category_id, function(err, cat){
			if(err){
				res.send(err);
			}
				res.render('articles', {
				title: cat.title + ' Article',
				categories: cat,
				articles: art
			});
		});
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

router.post('/comment/add/:id', function(req,res,next){

	req.checkBody('comment_subject', 'Subject is required').notEmpty();
	req.checkBody('comment_author', 'Author is required').notEmpty();
	req.checkBody('comment_body', 'Body is required').notEmpty();

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
		Article.getArticleById(req.params.id, function(err,art){
			if(err){
				res.send(err);
			}
				res.render('article', {
				title: 'Article',
				article: art,
				errors: errors
			});
		});
	} else {
		let article = new Article();
		var query = {_id: req.params.id};
		var comment = {
		comment_subject: req.body.comment_subject,
		comment_body: req.body.comment_body,
		comment_author: req.body.comment_author
		}

		Article.addComment(query, comment, function(err,art){
			res.redirect('/articles/show/'+ req.params.id)
		});
	}
})

module.exports = router;