


$( document ).ready(function() {
	var listInput = $("input[option-name]");

	var options = {};
	
	try {
		options = JSON.parse(localStorage.getItem("options")) || {};
	} catch (error) {}
	
	listInput.each(function(elm){
		var $elm = $(this);
		var key = $elm.attr("option-name");
		var type = $elm.attr("type");
		var val = options[key];

		if(type == 'checkbox'){
			$elm.prop('checked', val || false);
		}else{
			val && $elm.val(val);
		}
	});
	
	listInput.change(function(elm){
		var $elm = $(this);
		var key = $elm.attr("option-name");
		var type = $elm.attr("type");
		var val = options[key];

		if(type == 'checkbox'){
			val = $elm.is(':checked');
		}else{
			val = $elm.val();
		}
		options[key] = val;
		localStorage.setItem("options",JSON.stringify(options));
	});
});

