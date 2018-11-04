<?php
// check if fields passed are empty

if(empty($_POST['name'])  		||
   empty($_POST['demo'])    ||
    empty($_POST['phone'])     ||
   empty($_POST['mail']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "Please Complete all fields!";
	return false;
   }
   

	
$name = $_POST['name'];
$email_address = $_POST['mail'];
$subject = $_POST['subject'];
$message= $_POST['message'];
$demo =  $_POST['demo'];
$phone =  $_POST['phone'];
	
// create email body and send it	
$to = 'raziboy939@gmail.com'; // PUT YOUR EMAIL ADDRESS HERE
$email_subject = "MyJobTank Contact Form Message from  $name"; // EDIT THE EMAIL SUBJECT LINE HERE
$email_body = "You have received a new message from the Contact form.\n\n"."Here are the details:\n\nName: $name\n\nPhone Number: $phone\n\nCity: $demo\n\nEmail: $email_address\n\nSubject:\n$subject\n\nmessage:\n$message
";
$headers = "From:  raziboy939@gmail.com\n";
$headers .= "Reply-To: $email_address";	

	$headers .= "Return-Path:  raziboy939@gmail.com\r\n";
	$headers .= "X-Mailer: PHP \r\n";


 $retval = mail($to,$email_subject,$email_body,$headers);
    if( $retval == true )
    {
    echo file_get_contents("submission.html");

    }
    else
    {
    echo "Message could not be sent...";
    }


return true;			
?>