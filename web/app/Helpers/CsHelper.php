<?php


if (!function_exists('get_page_count')) {

    /**
     *
     * @param type $total_records
     * @param type $page_size
     * @return type
     */
    function get_page_count($total_records = 0, $page_size = 10)
    {
        if ($page_size == 0) {
            return 0;
        }
        return $num_pages = (int)ceil($total_records / $page_size);
    }
}

if (!function_exists('time_elapsed_string')) {

    function time_elapsed_string($datetime, $full = false)
    {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full)
            $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }

}

if (!function_exists('format_date')) {
    /**
     * @param string $date
     * @param string $format
     */
    function format_date($format = 'Y-m-d H:i:s', $date = 'now')
    {
        if (empty($format)) {
            $format = 'Y-m-d H:i:s';
        }
        $date = empty($date) ? 'now' : $date;

        return date($format, strtotime($date));
    }
}


if (!function_exists('round_odd_value')) {
    /**
     * @param $value
     * @return float
     */
    function round_odd_value($value)
    {
        return round($value, 2);
    }
}

if (!function_exists('format_size_units')) {
    function format_size_units($bytes)
    {
        if ($bytes >= 1073741824) {
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        } elseif ($bytes > 1) {
            $bytes = number_format($bytes, 2) . ' bytes';
        } elseif ($bytes == 1) {
            $bytes = $bytes . ' byte';
        } else {
            $bytes = '0 bytes';
        }

        return $bytes;
    }
}
if (!function_exists('send_fcm_notification')) {
    /**
     * Send FCM Notification
     * @param array $registrationIds
     * @param string $title
     * @param string $body
     * @return bool
     */
    function send_fcm_notification(array $registrationIds, string $title, string $body)
    {
        $firebaseToken = env('FIREBASE_KEY', null);
        $data = [
            "registration_ids" => $registrationIds,
            "notification" => [
                "title" => $title,
                "body" => $body,
            ]
        ];
        $dataString = json_encode($data);
        $headers = [
            'Authorization: key=' . $firebaseToken,
            'Content-Type: application/json',
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
        $response = curl_exec($ch);
        return $response;
    }
}

function createUrlSlug($urlString='')
{
  $slug = preg_replace('/[^A-Za-z0-9-]+/', '-', strtolower($urlString));
  return $slug;
}
