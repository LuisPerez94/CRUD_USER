$(function(){
	//eliminar el producto con AJAX
	$("#tbl-users #btn-delete").click(function(e){
      e.preventDefault();
      var elemento=$(this);
      var id =elemento.parent().parent().find("#id_user").text();
      var confirmar= confirm("Desea eliminar el usuario?");
      if(confirmar){
      	$.ajax({
      	url:'/deleteUser',
      	method:'post',
      	data:{id: id},
      	success: function(res){
      		if(res.res){
      			elemento.parent().parent().remove();
      		}
      	}
      });
      }
      
	});
});