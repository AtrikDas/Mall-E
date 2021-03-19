var params = {
    'api_key_private': 'pri_50990bf1f8828f6abbf6152013113c6b',
    'venue_name': 'McDonalds',
    'venue_address': 'Ocean Ave, San Fransisco'
}


export default getPopularTimesData = () => {
    $.ajax({
    "url": "https://besttime.app/api/v1/forecasts?" + new URLSearchParams(params),
    "method": "POST"
    }).done(function (response) {
        console.log(response);
    });
}
