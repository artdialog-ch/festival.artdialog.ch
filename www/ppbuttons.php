<?php
$debug = $_GET["debug"];
$prod = $_SERVER["SERVER_NAME"] === 'festival.artdialog.ch';

if ($debug) {
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
}

function getPpButtonDetailsFromRequest() {
	$res = array();
	$responseArray = get_ppButtonDetailsFromRequest();
	if (is_array($responseArray)) {
		$event_id = htmlspecialchars(explode("=", substr($responseArray['L_BUTTONVAR13'], 1, -1))[1]); //[L_BUTTONVAR13] => "item_number=CERF1905"
		$event_title = htmlspecialchars(explode("=", substr($responseArray['L_BUTTONVAR12'], 1, -1))[1]); //[L_BUTTONVAR12] => "item_name=Eintrittskarte ARTRecital "C.Enderle/R.Friedemann""
		$btn_html = $responseArray['WEBSITECODE'];
		
		$res['event_id'] = $event_id;
		$res['event_title'] = $event_title;
		$res['btn_html'] = $btn_html;
	}
	return $res;
}

function get_ppButtonDetailsFromRequest() {
	$eventid = $_GET["eventid"];
	$lang = $_GET["lang"] ? $_GET["lang"] : 'de';
	return $eventid ? get_ppButtonDetails($eventid, $lang) : "no eventid";
}

function get_ppButtonDetails($eventid, $lang) {
	global $prod, $debug;
	
	if ($prod) {
		require '/var/www/vhosts/artdialog.ch/.sec/pp_prod.php';
		require 'btn_prod.php';
	} else {
		require '/var/www/vhosts/artdialog.ch/.sec/pp_sandbox.php';
		require 'btn_sandbox.php';
	}

	$hostedbuttonid = $btn_data[$lang][$eventid];

	$params = array(
		'VERSION' => '124.0',
		'USER' => $ppAPIUsername,
		'PWD' => $ppAPIPassword,
		'SIGNATURE' => $ppAPISignature,
		'METHOD' => 'BMGetButtonDetails',
		'HOSTEDBUTTONID' => $hostedbuttonid,
	);

	$request = http_build_query($params);
	$curlOptions = array (
			 CURLOPT_URL => $ppAPI,
			 CURLOPT_VERBOSE => 1,
			 CURLOPT_SSL_VERIFYPEER => FALSE,
			 CURLOPT_SSL_VERIFYHOST => FALSE,
			 CURLOPT_RETURNTRANSFER => 1,
			 CURLOPT_POST => 1,
			 CURLOPT_POSTFIELDS => $request,
			 CURLOPT_SSLVERSION => 6,
		  );

		$ch = curl_init();
		curl_setopt_array($ch,$curlOptions);
		$response = curl_exec($ch);

		//Checking for cURL errors
	if (!curl_errno($ch)) {
		 curl_close($ch);
		 $responseArray = array();
		 parse_str($response,$responseArray); // Break the NVP string to an array
		 return $responseArray;
		 
	  } else if ($debug) {
		 return "curl_error: " . curl_error($ch);
		 curl_close($ch);
	}
}
/*
function get_ppButtonHtml() {
	$responseArray = get_ppButtonDetailsFromRequest();
	if (is_array($responseArray)) {
		 if($responseArray['HOSTEDBUTTONID'] === $hostedbuttonid) {
			$btn_code = $responseArray['WEBSITECODE'];
			if (!$debug) {
				return $btn_code;
			} else {
				return htmlspecialchars($btn_code);
			}
		 }
	}
	else
	{
		return $responseArray;
	}
}
*/

if ($debug) {
	echo print_r (getPpButtonDetailsFromRequest());
	echo print_r (get_ppButtonDetailsFromRequest());
}
?>