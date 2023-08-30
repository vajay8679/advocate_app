<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Jobs\SendBulkQueueEmail;
use Validator;
use App\Models\Invite;
use Illuminate\Http\Request;

class InviteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->sendResponse();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'emails' => 'required|array',
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $user = $request->user();
            $invitations = [];
            $emails = $request->get('emails');
            foreach ($emails as $email) {
                $invitations[] = array(
                    'email' => $email,
                    'user_id' => $user->id,
                    'token' => $user->referral_code,
                    'accepted' => '0',
                    'created_at' => now(),
                    'updated_at' => now(),
                );

                $jobDetails = [
                    'sender_name' => $user->first_name . ' ' . $user->last_name,
                    'referral_code' => $user->referral_code,
                    'email' => $email,
                    'subject' => $user->first_name . ' sent you an inviation to join ' . config('app.name')
                ];
                $job = (new SendBulkQueueEmail($jobDetails))->delay(now()->addSeconds(1));
                dispatch($job);
            }
            Invite::insert($invitations);
            $this->apiResponse['message'] = 'Invitations sent successfully.';
        }
        return $this->sendResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Invite $invite
     * @return \Illuminate\Http\Response
     */
    public function show(Invite $invite)
    {
        $this->apiResponse['data'] = $invite->toArray();
        return $this->sendResponse();
    }

    /**
     * Update the invite
     * @param Invite $invite
     * @return \App\Http\Controllers\json
     */
    public function update(Invite $invite)
    {
        $this->setResponseCode(404);
        $this->apiResponse['message'] = 'This operation is not permitted.';
        return $this->sendResponse();
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Invite $invite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invite $invite)
    {
        $this->setResponseCode(404);
        $this->apiResponse['message'] = 'This operation is not permitted.';
        return $this->sendResponse();
    }
}
