<?php
require_once ("phpactiveresource-master/ActiveResource.php");

class Issue extends ActiveResource {
	var $site = 'http://bmosley:DricasM4x@support.techsindc.com/';
	var $request_format = 'xml';
	//var $request_headers = array("x-api-key: V4846dHnN7VhjN70nnMw");
}

//var $element_name = '/issue';

class techsindcapp {
	function getIssues($request) {

		if (!empty($request["id"])) {
			$id = $request["id"];
			return $this -> get("http://support.techsindc.com/issues/{$id}.json?key=V4846dHnN7VhjN70nnMw&include=attachments,journals");
		}
		return $this -> get("http://support.techsindc.com/issues.json?key=V4846dHnN7VhjN70nnMw");
	
	}

	function login($request) {
		$retArr = new stdClass();
		$username = (!empty($request["username"]))?$request["username"]:null;
		$password = (!empty($request["password"]))?$request["password"]:null;
		$errorInfo = null;
		try{
			if(!$username){
				$errorInfo = "No username was entered";
			}
			if(!$password){
				$errorInfo .= ", No password was entered";
			}
			if($username && $password){
				$retArr->authenticated = true;
			}
			else{
				throw new Exception($errorInfo);
			}
		}
		catch(Exception $e){
			$retArr->errormsg = $e->getMessage();
		}
		return $retArr;
	}

	function createissue($request) {

		$retArr = new stdClass();

		$description = sprintf("Customer: %s\nAddress: %s\nPhone #%s\nEmail: %s\n\n", $request["customer"], $request["address"], $request["phone"], $request["email"]) . $request["description"];

		$issue = new Issue( array('subject' => $request["subject"], 'project_id' => '1', 'description' => $description, 'custom_fields' => array('@type' => 'array', 'custom_fields' => array('@id' => 3, array('value' => 'jnjtieningveirn')))));

		$issue -> save();
		$retArr -> id = $issue -> id;
		$retArr -> confirmationcode = "111020293";

		return $retArr;
	}
	function createAdminIssue($request){
		$retArr = new stdClass();
		$query = "INSERT INTO issues 
					(fname, lname, email, phonenum, userdescription, equipment_data, redmine_issue_id, uuid, created_on, created_by) 
					VALUES (?,?,?,?,?,?,?,?,?,?)";
		
		return $retArr;
	}
	function createContact($request){
		$retArr = new stdClass();
		$type = (!empty($request["type"]))?$request["type"]:"Customer";
		$query = "INSERT INTO contacts (companyname, fname, lname, minitial, email, address, phonenum, type) VALUES (?,?,?,?,?,?,?,?)";
		
		return $retArr;
	}
	function searchContacts($request){
		$retArr = new stdClass();
		$query = "SELECT * FROM contacts WHERE fname = ? OR lname = ? OR email = ? OR companyname = ?";
		
		
		return $retArr;
	}
	function post() {
		$ch = curl_init();

	}

	function get($url) {
		return file_get_contents($url);
	}

}

$request = (!empty($_REQUEST)) ? $_REQUEST : null;
$action = (!empty($request["action"])) ? $request["action"] : null;
$tech = new techsindcapp();

switch($action) {
	case "login" :
		print(json_encode($tech -> login($request)));
		break;
	case "getissues" :
		
		print($tech -> getIssues());
		break;
	case "addcomment" :
		break;
	case "createissue" :
		print(json_encode($tech -> createissue($request)));
		break;
}
?>