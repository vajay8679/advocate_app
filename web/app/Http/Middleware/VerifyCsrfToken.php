<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
        '/api/*',
        // '/api/auth/signin',
        // '/api/status-cases',
        // '/api/admin/bank',
        // '/api/admin/bank-branch',
        // '/api/court-case',
        // '/api/court-case-2',
        // '/api/court-case?case_type_id=1',
        // '/api/court-case?case_type_id=2',
        // '/api/court-case-file',
        // '/api/court-case/ae8b440e-1ecf-48d4-bb9c-d29c03cbe6e2',
        // '/api/court-case/9fbccd4a-bb0e-4cdb-b9b8-e26731eaadfb',
        // '/api/court-case/5d99007b-f436-4067-b149-f7cce935f20d',
        // '/api/court-case/dff53d22-94c6-476a-9bc6-ee36ff3bdb2d',
        // 'api/court-case-file/cf247c9d-e031-4ef3-a7e9-bd7db83af451',
        // '/api/court-case/dff53d22-94c6-476a-9bc6-ee36f2f3bdbd',
        // '/api/court-case/4ce7e18a-528a-4d73-a1bd-531a2ee8f2a5',
        // '/api/court-case/93c3ed0c-b605-4d3c-8efb-bdfe98391b58',
        // '/api/court-case/5d99007b-f436-4067-b149-f72cce935f0d',
        // '/api/court-case/7e2b0d73-e3fa-4d51-8176-f55dd4d14dec',
        // '/api/court-case/d6da560e-2c3c-4aa2-b915-fd756c11d77c',
        // '/api/court-case/52208503-7d94-40b4-9de6-52b29f8ab59',
        // '/api/court-case/146f372e-a981-4903-8a8f-6c89ca5b4346',
        // '/api/court-case/9dec5488-e081-4343-8c77-3c96a53ce2e4',
        // '/api/court-case/52597619-f1d0-4db0-861f-9ceb8a80b2bd'
    ];
}
