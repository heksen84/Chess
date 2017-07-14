<?php
/*
-----------------------------
 Серверная часть
-----------------------------*/
include "php/class.msg.php";

$GLOBALS["redis"] = new Redis(); // глобальный объект

// -- соединиться с redis
function RedisConnect() {
 $GLOBALS["redis"]->connect('127.0.0.1', 6379);          
}

// -- загрузка
function LoadFromFile() {
	msg::success(json_decode(file_get_contents('chess.save')));
}

// -- В файл
function SaveToFile($board_array) {
	$fhandle = fopen("chess.save","w");
	fwrite($fhandle, json_encode($board_array));
	fclose($fhandle);
	msg::success("готово");
}
// -----------------------------
// -- загрузка
// -----------------------------
function LoadFromRedis() {
	RedisConnect();
	echo json_encode($GLOBALS["redis"]->lrange("_item",0,128));
}
// -----------------------------
// -- В озу
// -----------------------------
function SaveToRedis($board_array) {	
	RedisConnect();
	$fhandle = fopen("debug.txt","w");	
	$GLOBALS["redis"]->del("_item");
	foreach($board_array as $key) {
        $GLOBALS["redis"]->rpush("_item", $key["figure"]); 
        $GLOBALS["redis"]->rpush("_item", $key["type"]); 
		fwrite($fhandle, $key["figure"]."-".$key["type"]."\n");
	}
	fclose($fhandle);
}

// ------------------------
// -- Router --
// ------------------------
switch(strtoupper($_SERVER["REQUEST_METHOD"])) {	
	case "POST": {	
		if (isset($_POST["func"])) {    			    								
			switch ($_POST["func"]) {															
				// сохранить состояние
				case "SRV_Save": {
					$board_array = $_POST["board_array"];
					switch((int)$_POST["save_type"]){
						case 0: SaveToFile($board_array); break;
						case 1: SaveToRedis($board_array); break;
					}															
					break;
				}				
				// загрузить состояние
				case "SRV_LoadFromFile": {					
					LoadFromFile();
					break;
				}
				case "SRV_LoadFromRedis": {
					LoadFromRedis();
					break;
				}
			}
		}
	}
}
?>