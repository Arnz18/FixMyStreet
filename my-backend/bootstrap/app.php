<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        apiPrefix: '/api' // Define API prefix here
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Use only existing middleware classes
        // For API routes, include Sanctum middleware for token authentication
        $middleware->api([
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            // You can add other existing middleware here if needed
        ]);
        
        // No custom middleware that doesn't exist
        // If you need custom middleware, create it first with:
        // php artisan make:middleware YourMiddlewareName
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
