var express = require('express');
var router = express.Router();

Category = require('../models/category.js');

router.get('/', function (req,res,next){
	Category.getCategories(function(err,cat){
		if(err){
			res.send(err);
		}
		res.render('categories', {
			title: 'Categories',
			categories: cat
		});
	});
});

router.post('/add', function(req,res,next){
	req.checkBody('title', 'Title is required').notEmpty();

	let errors= req.validationErrors();

	if(errors){
		res.render('add_category', {
			errors: errors,
			title: 'Create Category'
		});
	} else {
		let category = new Category();
		category.title = req.body.title;
		category.description = req.body.description;

		Category.addCategory(category, function(err,cat){
			if(err){
				res.send(err);
			}
			req.flash('success', 'Category Saved');

			res.redirect('/manage/categories')
		});
	}
});

router.post('/edit/:id', function(req,res,next){
	req.checkBody('title', 'Title is required').notEmpty();

	let errors= req.validationErrors();

	if(errors){
		Category.getCategories(function(err,cat){
			res.render('edit_category', {
				errors: errors,
				category: cat,
				title: 'Edit Category'
			});
		});
	} else {
		let category = new Category();
		var query = {_id: req.params.id};
		var update = {
			title: req.body.title,
			description: req.body.description
		}

		Category.updateCategory(query, update, {}, function(err,cat){
			if(err){
				res.send(err);
			}
			req.flash('success', 'Category Updated');
			res.redirect('/manage/categories')
		});
	}
});

router.delete('/delete/:id', function(req,res,next){
	var query = {_id: req.params.id};

	Category.removeCategory(query, function(err,cat){
		if(err){
			res.send(err);
		}
		res.status(200);
	})
})

module.exports = router;