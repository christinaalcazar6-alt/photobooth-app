<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // I-force ang HTTPS URLs kapag nasa production, staging, o kahit anong non-local environment
        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }
    }
}