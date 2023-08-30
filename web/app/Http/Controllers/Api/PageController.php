<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class PageController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param string $slug
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function show($slug = '')
    {
        $page = 'errors.404';
        switch ($slug):
            case 'about':
                $page = 'pages.about';
                break;
            case 'tutorial':
                $page = 'pages.tutorial';
                break;
            default:
                return abort(404);
                break;
        endswitch;
        return view($page);
    }
}
