<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(){
        $nav = 'index';
        $title = 'Lokasi Prioritas Reforma Agraria';
        return view('frontends.index', compact('title','nav'));
    }
}
