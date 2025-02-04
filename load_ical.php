<?php
$ical_url = "https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID.ics"; // Replace with your Airbnb iCal URL

function parse_ical($ical_url) {
    $events = [];
    $ical_data = file_get_contents($ical_url);

    preg_match_all('/BEGIN:VEVENT.*?DTSTART:(.*?)\s.*?DTEND:(.*?)\s.*?SUMMARY:(.*?)\s.*?END:VEVENT/s', $ical_data, $matches, PREG_SET_ORDER);

    foreach ($matches as $match) {
        $events[] = [
            'title' => 'Booked',
            'start' => $match[1],
            'end' => $match[2],
            'color' => 'red', // Mark booked dates in red
            'textColor' => 'white'
        ];
    }

    return json_encode($events);
}

echo parse_ical($ical_url);
?>