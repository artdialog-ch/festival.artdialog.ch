<?php 
	switch($_SERVER['REQUEST_METHOD'])
	{
	case 'GET': $the_request = &$_GET; break;
	case 'POST': $the_request = &$_POST; break;
	}
	
	if (isset($the_request))
	{
		$LF = "\n";
		$email_address = $the_request['email']; 
		if(empty($email_address))   
		{    
			echo "No arguments Provided!";   
			return false;   
		} 	
		
		$res_html = file_get_contents("unsubscribe.html");
		$res_html = preg_replace("/\\$\\{email_address\\}/", $email_address, $res_html); 
		
		$to = $email_address;
		
		$email_subject = "Unsubscribe Festival ArtDialog Newsletters"; 

		$headers  = '';
		$headers .= "MIME-Version: 1.0" . $LF;
		$headers .= 'Content-type: text/html; charset=utf-8' . $LF;;

		$headers .= "To: " . $email_address . $LF;
		$headers .= "From: newsletter@artdialog.ch" . $LF;
		$headers .= "Reply-To: newsletter@artdialog.ch" . $LF;
		$headers .= "BCC: newsletter@artdialog.ch" . $LF;
		
		$sendmailok = mail($to,$email_subject,$res_html,$headers);
		
		echo $res_html;
	}
?>
