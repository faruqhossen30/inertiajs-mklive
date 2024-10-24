<?php

use App\Http\Controllers\Admin\AgoraController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboarController::class, 'index'])->name('dashboard');
    Route::resource('category', CategoryController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::get('setting/agora', [SettingController::class, 'agora'])->name('settings.agora.create');
    Route::post('setting/agora', [AgoraController::class, 'store'])->name('settings.agora.store');
    // Users
    Route::get('users', [UserController::class, 'index'])->name('admin.users');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
