<?php
	
	class Database{
		private static $link = null;
		private static function getLink(){
			if(self::$link){
				return self::$link;
			}
			$ini = "config.ini";		
			$parse = parse_ini_file($ini, true);
			$driver = $parse["dbdriver"];
			$dsn = "{$driver}:";
			$user = $parse["dbuser"];
			$password = $parse["dbpassword"];
			$options = $parse["dboptions"];
			foreach ($parse["dsn"] as $k => $v) {
				$dsn .= "{$k}={$v};";
			}
			self::$link = new PDO ( $dsn, $user, $password );
			return self::$link;
		}
		public static function __callStatic($name, $args){
			$callback = array (self::getLink(), $name);
			return call_user_func_array($callback, $args);
		}
	}
	/*try{
		$stmt = Database::query("SELECT * FROM issues");
		print_r($stmt->fetchAll());
	}
	catch(PDOException $e){
		print($e->getMessage());
	}*/
?>