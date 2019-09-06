<?php 
if (is_ajax()) {  
	$page = htmlspecialchars($_POST["page"]);
   	gallery($page);   
}
//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function gallery($page){
	$dir ="assets/img/gallery";

	if ( $page == "kunstler"){
		$dir ="assets/img/kunstler";
	}

	$years = array();
	$outyears = "";
	$outputimg = "";
	$out = array();
	
	$ffs = scandir($dir);
	
	foreach($ffs as $ff){
		if($ff != '.' && $ff != '..'){
			
			if(is_dir($dir.'/'.$ff)){
				$ffs2 = scandir($dir.'/'.$ff);
				foreach($ffs2 as $ff2){
					if($ff2 != '.' && $ff2 != '..'){
						$filename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $ff2);
						if (($pos = strpos($filename, "_")) !== FALSE) {
						$filename = substr($filename, $pos + 1); 
						} 
						$filename = str_replace("_","<br>",$filename);
						$filename = str_replace("-"," ",$filename);
						$ff2 = rawurlencode($ff2);
						
						$out[$ff][] = ['/'.$dir.'/'.$ff.'/'.$ff2, $filename,];
			
					}
				}
				
			}			
			
		}
	}	
	
	echo json_encode($out); 	
}
?>