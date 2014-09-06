<?php
require '../vendor/autoload.php';
require '../library/redbean/rb.php';
require '../config/config.php';



$app->get('/',function () use ($app){
	print('Welcom To our website');
    $app->log->info("hi how are you");
	//Write Log
}


$app->post('/',function () use ($app){
	print('Welcom To our website');
    $app->log->info("You are using post method");
	
}


$app->map('/', function () use ($app) {
    $app->log->info("hi how are you");
    $app->render('index.html');
})->via('GET', 'POST');



$app->get('/validatei',function () use ($app){
	$validator = new gump\GUMP();

	$_POST = array(
	'username' 	  => 'test',
	'password' 	  => '11',
	'email'	      => 'yourmail@gmail.com',
	'gender'   	  => 'Male',
	'bio'		  => 'This is good! I think I will switch to another language'
	);

	$_POST = $validator->sanitize($_POST);

	$rules = array(
	'username'    => 'required|alpha_numeric|max_len,100|min_len,6',
	'password'    => 'required|max_len,100|min_len,6',
	'email'       => 'required|valid_email',
	'gender'      => 'required|exact_len,1',
	'credit_card' => 'required|valid_cc',
	'bio'		  => 'required'
	);

	$filters = array(
	'username' 	  => 'trim|sanitize_string',
	'password'	  => 'trim|base64_encode',
	'email'    	  => 'trim|sanitize_email',
	'gender'   	  => 'trim'
	);

	$_POST		= $validator->filter($_POST, $filters);
	$validated  = $validator->validate($_POST, $rules);

	if($validated === TRUE)
	{
	echo "Successful Validation\n\n";
	print_r($_POST); // You can now use POST data safely
	exit;
	}
	else
	{
	print_r($validated); // Shows all the rules that failed along with the data
	}



}





$app->run();
