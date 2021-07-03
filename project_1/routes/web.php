<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/Art-works', 'workSiteController@index')->name('works');
Route::get('/Art-works/{id}', 'workSiteController@show')->name('showWork');
Route::get('/About-us', 'HomeController@about')->name('about-us');
Route::get('/contact', 'HomeController@contact')->name('contact');