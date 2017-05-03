$(document).ready(function(){
	$('.category-delete').on('click', function(e){
		console.log('deleting');
		$target = $(e.target);
		var id = $target.attr('data-cat-id');
		if(window.confirm("Do you want to delete this category?")){
		$.ajax({
			type: 'DELETE',
			url: '/categories/delete/'+id,
			success: function(response){
				alert('Deleting Category');
				window.location.href='/';
			}
		})
	}
	});
	$('.article-delete').on('click', function(e){
		console.log('deleting');
		$target = $(e.target);
		var id = $target.attr('data-art-id');
		if(window.confirm("Do you want to delete this article?")){
		$.ajax({
			type: 'DELETE',
			url: '/articles/delete/'+id,
			success: function(response){
				alert('Deleting Article');
				window.location.href='/';
			}
		})
	}
	});
});