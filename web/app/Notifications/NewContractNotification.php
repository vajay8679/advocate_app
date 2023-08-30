<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Broadcasting\FcmChannel;

//use App\Channels\FcmChannel;

class NewContractNotification extends Notification
{
    use Queueable;

    public $details;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        $channels = ['mail', 'database', FcmChannel::class];
//        $channels = [FcmChannel::class];
        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'full_name' => $this->details['full_name'],
            'notification_text' => 'You got a new contract starting from ' . $this->details['start_date'] . ' and valid till ' . $this->details['expiry_date'],
        ];
    }

    /**
     * @param $notifiable
     * @return array
     */
    public function toFcm($notifiable)
    {
        return [
            'full_name' => $this->details['full_name'],
            'notification_text' => $this->formatNotificationText(),
        ];
    }

    /**
     * @return string
     */
    public function notificationContent()
    {
        return 'You got a new contract starting from ' . $this->details['start_date'] . ' and valid till ' . $this->details['expiry_date'];
    }

    public function notificationTitle()
    {
        return 'You got a new contract ';
    }
}
