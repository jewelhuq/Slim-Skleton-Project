<?php
/*
* (Slim) Application Config
*/

$app = new \Slim\Slim(array(
    'templates.path' => '../templates',
));

// Create monolog logger and store logger in container as singleton 
// (Singleton resources retrieve the same log resource definition each time)
$app->container->singleton('log', function () {
    $log = new \Monolog\Logger('slim-skeleton');
    $log->pushHandler(new \Monolog\Handler\StreamHandler('../logs/app.log', \Monolog\Logger::DEBUG));
    return $log;
});

// Prepare view
$app->view(new \Slim\Views\Twig());
$app->view->parserOptions = array(
    'charset' => 'utf-8',
    'cache' => realpath('../templates/cache'),
    'auto_reload' => true,
    'strict_variables' => false,
    'autoescape' => true
);
$app->view->parserExtensions = array(new \Slim\Views\TwigExtension());



/**Change the Following Data*/

/*[Database Configaration]*/
R::setup('mysql:host=localhost;dbname=newspaper','root','');

/*[Default Time Zone]*/
date_default_timezone_set('Asia/Dhaka');   

/*[Default Language]*/
define("DEFAULT_LANGUAGE","EN");


/*[Default Theme]*/
define("DEFAULT_THEME","theme1");
