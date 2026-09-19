<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoboothController;

Route::get('/', [PhotoboothController::class, 'index']);