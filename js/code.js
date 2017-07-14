// -----------------------------
// html загружен
// -----------------------------
$(document).ready(function() 
{									
	const black=["л","к","с","Ф","К","с","к","л","п","п","п","п","п","п","п","п"];
	const white=["п","п","п","п","п","п","п","п","л","к","с","Ф","К","с","к","л"];
	
	var cell_index1 	= 0;
	var cell_index2 	= 0;
	var cur_row 		= 0;
	var cur_index 		= 0;
	var cur_item 		= null;
	var cur_data_type 	= null;
	var board 			= [];
	var white_row		= 6
	var white_index		= 0;
	
	// ---------------------------------
	// вывод сообщения в блок статуса
	// ---------------------------------
	function status(msg){		
		$("#status").append("<div class='status_item'>"+msg+"</div>");
	}
	
	// добавить фигуру
	$( "#board td" ).click(function() {		
		switch($(this).data("type"))
		{
			case "black": $( "#add_figure1" ).prop("disabled", true); break;
			case "white": $( "#add_figure2" ).prop("disabled", true); break;
		}		
		if ($(this).text()=="") {
			$(this).text(cur_item).data("type", cur_data_type);		
			$("#board tr").eq(cur_row).find("td").eq(cur_index).empty().removeData("type");			
			cur_item=null;
		}
		else {
			cur_row   		= $(this).parent().index();
			cur_index 		= $(this).index();
			cur_item  		= $(this).text();
			cur_data_type  	= $(this).data("type");
			$("#board td").css("font-weight","").css("color","black");
			$(this).css("font-weight","bold").css("color","red");			
		}
	});

	// удалить фигуру
	$( "#board td" ).mousedown(function(e){ 
	  if( e.button == 2 ) { 
	    status("-"+$(this).text());
		$(this).empty().removeData("type");		
	  } 
	  return true; 
	}); 

	// запретить контекстное меню на доске
	$( "#board" ).contextmenu(function() {
		return false;
	});

	// добавить в массив
	function insert(figure, type) {
		board.push({figure: figure, type: type});        
	}
	// ----------------------------------
	// сохранить состояние
	// ----------------------------------
	$( "#button_save" ).click(function() {				
		board=[];
		for (var x=0; x<8; x++) {
			for (var y=0; y<8; y++) {
				var item = $("#board tbody tr").eq(x).find("td").eq(y);								
				if (item.text()!="") {
					insert(item.text(), item.data("type"));					
				}
				else {
					insert(null, null);					
				}								
			}		
		}				
		console.log(board);

		// отправить на сервер
		$.ajax
		({
			url: "server.php",
			data: 
			{ 
				"func": "SRV_Save",
				"board_array": board,
				"save_type": $("#storage_type_select").val(),
			},
			method:"POST",
		}).done(function( data ) 
		{									
			var obj = jQuery.parseJSON(data);			
			switch(obj.answer) {
				case "error": alert(obj.string); break;
				case "warning": alert(obj.string); break;
				case "success": {							
					console.log(obj.string);
				}
			} 		
		});
	});

	/* зполнить из файла */
	function FillBoardFromSavedFile(str)
	{
		var x=0; var y=0;
		$.each(str, function(i, item) {				
			$("#board tbody tr").eq(x).find("td").eq(y).text(item.figure).data(item.type);
			if (item.figure!="") status("+"+item.figure);			
			y++;
			if (y>7){
			 x++;
			 y=0;
			}
		});
	}
	// ----------------------------------
	// загрузить состояние
	// ----------------------------------
	$( "#button_load" ).click(function() {		
		switch($("#storage_type_select").val())
		{
			// из файла
			case "0":
			{				
				$.ajax
				({
					url: "server.php",
					data: { 
						"func": "SRV_LoadFromFile"	},
					method: "POST",
				}).done(function( data ) 
				{														
					var obj = jQuery.parseJSON(data);			
					switch(obj.answer) {
						case "error": alert(obj.string); break;
						case "warning": alert(obj.string); break;
						case "success": {
							$( "#clear" ).trigger("click");
							FillBoardFromSavedFile(obj.string);
						}
					} 		
				});				
				break; 
			}
			// из редиса
			case "1":
			{
				$.ajax
				({
					url: "server.php",
					data: { 
						"func": "SRV_LoadFromRedis" },
					method: "POST",
				}).done(function( data ) 
				{	
					console.log(data);					
					$( "#clear" ).trigger("click");
					parsedTest = JSON.parse(data);					
					var x=0; var y=0;		
					for (var i=0; i < 128; i++) {																																								
						var item=$("#board tbody tr").eq(x).find("td").eq(y);
						item.text(parsedTest[i++]);						
						if (item.text()!="") status("+"+item.text());	
						y++;
						if (y>7){
						x++;
						y=0;
						}						
					}
				});				
				break; 
			}			
		}
	});
		
	// ------------------------------------
	// Добавить черную фигуру
	// ------------------------------------
	$( "#add_figure1" ).click(function() {
		if ( cell_index1 < 16 ) {			
		$("td").eq(cell_index1).text(black[cell_index1]).data("type", "black" );
		status("+"+black[cell_index1]);
		cell_index1++;		
		}		
	});
	
	// ------------------------------------
	// Добавить белую фигуру
	// ------------------------------------		
	$( "#add_figure2" ).click(function() {	
		if (white_index < 16){
			$("tr").eq(white_row).find("td").eq(cell_index2).text(white[white_index]).data("type", "white" );										
			cell_index2++;
			white_index++;
			if (cell_index2 > 7){ 						
				white_row++;
				cell_index2=0;							
			}							
			status("+"+white[white_index-1]);
		}
	});
	
	// -----------------------------
	// сброс
	// -----------------------------
	$( "#clear" ).click(function() {		
		$("#add_figure1, #add_figure2").prop("disabled", false);
		$("#board td").css("font-weight","").css("color","black");		
		$("td").empty().removeData("type");
		$("#status").empty();
		board=[];
		cell_index1 = 0;
		cell_index2 = 48;
		cur_row = 0;
		cur_index = 0;
		cur_item = null;				
		white_row=6
		white_index=0;
		cell_index2=0;		
	});	
});