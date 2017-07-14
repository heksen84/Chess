<!-- Test task LocalInternet for Ilya Bobkov -->
<title>Тестовая задача LocalInternet</title>
<link rel="shortcut icon" href="chess.ico" type="image/x-icon">
<head>
	<link href = "css/lib/bootstrap.min.css" rel = "stylesheet"/>
	<link href = "css/style.css<?php include "php/debug.php"?>" rel = "stylesheet"/>
	<script src = "js/lib/jquery-3.2.1.min.js"></script>
	<script src = "js/code.js<?php include "php/debug.php"?>"></script>
</head>
<body>
<div class="container">
<div class="row">
<div class="col-md-12 text-center" id="store_type">		
<h4>Тестовая задача <span style="font-weight:bold">LocalInternet</span></h4>
Тип хранилища:
<select id="storage_type_select">
<option value=0>текстовой файл</option>
<option value=1>редис</option>
</select>
	<button class="btn btn-primary" id="button_save" title="сохранить состояние">сохранить</button>
	<button class="btn btn-success" id="button_load" title="загрузить состояние">загрузить</button>
	<div style="margin-top:5px;color:grey;font-size:15px">
	<div>Левая кнопка мыши - удалить фигуру</div>
	</div>
</div>
<div class="col-md-6 text-center">
<button class="fig_button" id="add_figure1">Добавить фигуру</button><button class="fig_button" id="clear">Очистить поле</button>
<table border="1" id="board">
<tbody>
	<tr><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td></tr>
	<tr><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td></tr>
	<tr><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td></tr>
	<tr><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td></tr>
	<tr><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td></tr>
	<tr><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td></tr>
	<tr><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td></tr>
	<tr><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td><td class="grey"></td><td></td></tr>
</tbody>
</table>
<button class="fig_button" id="add_figure2">Добавить фигуру</button>
</div>
<div class="col-md-6 text-center">
<div id="status"></div>
</div>
</div>
</div>
</body>