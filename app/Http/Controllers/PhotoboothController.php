<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoboothController extends Controller
{
    public function index()
    {
        return view('photobooth');
    }
}