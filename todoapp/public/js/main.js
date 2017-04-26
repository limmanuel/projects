$(document).ready(function() {
	console.log("ready");
	$('.delete-todo').on('click', function(e){
		console.log('deleting');
		$target = $(e.target);
		var id = $target.attr('data-id');
		if(window.confirm("Sure ka na ba?")){
		$.ajax({
			type: 'DELETE',
			url: '/todo/delete/'+id,
			success: function(response){
				alert('Deleting Todo');
				window.location.href='/';
			}
		})
	}
	});
});