// send to logs
function log_event(type, description) {
    $.ajax({
        url: '/ajax/event',
        type: 'POST',
        dataType: 'JSON',
        data: {
            'csrf_test_name': $('meta[name="csrf_token"]').attr('content'),
            'type': type,
            'description': description,
        },
        success: function () {
        },
        error: function() {
        },
        complete: function () {
        }
    });
}

$(document).ready(function() {
    $('.upgrade').on('click', function(e){
        e.preventDefault();
        window.location.href = '/dashboard/settings/plans';
    });
});


$(document).ready(function() {
    $('.download-app').on('click', function(e){
        // Fetching the latest release data from GitHub
        fetch('https://api.github.com/repos/shoprocket/desktop-app/releases/latest')
        .then(response => response.json())
        .then(data => {
            // Determine the user's operating system
            const userAgent = window.navigator.userAgent.toLowerCase();
            let downloadURL;

            if (userAgent.indexOf('win') > -1) { // Windows
            downloadURL = data.assets.find(asset => asset.name.endsWith('.exe')).browser_download_url;
            } else if (userAgent.indexOf('mac') > -1) { // macOS
            downloadURL = data.assets.find(asset => asset.name.endsWith('.dmg')).browser_download_url;
            } else {
            // Default to Windows or provide another option
            downloadURL = "https://api.github.com/repos/shoprocket/desktop-app/releases/latest";
            }

            // Redirect to the download URL for the user's OS
            window.location.href = downloadURL;
        });
    });
});