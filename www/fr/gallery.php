<?php 
if (is_ajax()) {
  if (isset($_POST["year"]) && !empty($_POST["year"])) { //Checks if action value exists
    $year = $_POST["year"];
		print gallery($year); 
  }
}
//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function gallery($year){
	$dir ="../assets/img/gallery";
	$outyears = "";
	$outputimg = "";
	
	$ffs = scandir($dir);
	
	foreach($ffs as $ff){
		if($ff != '.' && $ff != '..'){
			if ( $ff == $year){
				if(is_dir($dir.'/'.$ff)){
					$ffs2 = scandir($dir.'/'.$ff);
					foreach($ffs2 as $ff2){
						if($ff2 != '.' && $ff2 != '..'){
							$filename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $ff2);
							$filename = str_replace("_","</br>",$filename);
							$filename = str_replace("-"," ",$filename);
							
							$outputimg .= '<div class="col-md-3 col-sm-6 ' . $ff . '">
												<div class="gallery-item">
													<img src="../assets/img/gallery/' . $ff . '/' . $ff2 . '" alt=".." class="img-responsive center-block">
													<a href="../assets/img/gallery/' . $ff . '/' . $ff2 . '" title="image title">
														<div class="caption">
															' . $filename . '
														</div>
													</a>
												</div>
											</div>';
						}
					}
				}
			}
			$outyears .= '<li class="year"><a href="#">' . $ff . '</a></li>';	
		}
	}
		
	$output =  '<div id="gal" style="display:block;">
					<div id="gal-filters">
						<div class="years"> '. $outyears  .'</div>
					</div>
					<div id="gal-items" class="row">'.$outputimg  .'</div>
				
				</div>';
				
	return $output;	
	
}

?>