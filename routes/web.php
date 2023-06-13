<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', [IndexController::class, 'index'])->name('index');
Route::get('/cms/addprofile', [ProfileController::class, 'addprofile']);
Route::get('/{slug}', [ProfileController::class, 'detailprofile']);



Route::group(['prefix' => 'cms/lpra-filemanager'], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});


Route::group(['middleware' => 'checkSession'], function () {

});


//if there is no session , redirect to login page
Route::group(['middleware' => 'hasSession'], function () {
    Route::get('cms/login', [LoginController::class, 'index'])->name('login');
});
