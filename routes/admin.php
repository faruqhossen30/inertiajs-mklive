<?php

use App\Http\Controllers\Admin\AgentController;
use App\Http\Controllers\Admin\AgoraController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\DepositController;
use App\Http\Controllers\Admin\EmojiController;
use App\Http\Controllers\Admin\GiftController;
use App\Http\Controllers\Admin\HostController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TopupController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WallpeperController;
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
    Route::get('hosts', [HostController::class, 'index'])->name('admin.hosts');
    Route::get('agents', [AgentController::class, 'index'])->name('admin.agents');
    Route::get('topups', [TopupController::class, 'index'])->name('admin.topups');


    Route::get('user/{uid}', [UserController::class, 'show'])->name('admin.user.show');

    Route::post('user/{uid}/sethost', [UserController::class, 'setAsHost'])->name('admin.user.sethost');

    Route::get('{uid}/deposit/user', [DepositController::class, 'create'])->name('admin.user.deposit');
    Route::post('{uid}/deposit/user', [DepositController::class, 'store'])->name('admin.user.deposit.store');






    Route::resource('gifts', GiftController::class);
    Route::resource('emojis', EmojiController::class);
    Route::resource('wallpapers', WallpeperController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
