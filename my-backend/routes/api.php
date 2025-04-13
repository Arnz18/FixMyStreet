<?php

// Add this at the top of your routes/api.php file
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    
    // Complaint routes
Route::post('/report', [ComplaintController::class, 'store']);
Route::get('/my-reports', [ComplaintController::class, 'userReports']);
    
    // Admin routes (would typically have additional middleware)
Route::get('/reports', [ComplaintController::class, 'index']);
Route::put('/report/{id}', [ComplaintController::class, 'update']);
});
