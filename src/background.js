/*global chrome*/

let buildRunning = false;

const notificationOptions = {
    type: 'basic',
    iconUrl: '../../pizza-truck.png',
    title: '',
    message: ''
}

function checkBuildStatus() {
    let header = new window.Headers();
    header.append('Travis-API-Version', '3');
    header.append('User-Agent', 'Build Notifier');
    header.append('Authorization', process.env.REACT_APP_TRAVIS_CI_TOKEN);

    const options = {
        method: 'GET',
        headers: header,
        mode: 'cors',
        cache: 'default'
    };
    fetch('https://api.travis-ci.org/builds', options)
        .then(results => {
            return results.json();
        })
        .then(data => {
            let newestBuild = data.builds[0];
            if (newestBuild.state === 'started') {
                chrome.browserAction.setBadgeText({text: '1'});
                buildRunning = true;
            } else if (newestBuild.state === 'passed'){
                if (buildRunning === true) {
                    console.log('Build finished, build passing');
                    notificationOptions.title = 'Build Finished';
                    notificationOptions.message = 'Build successfully completed';
                    chrome.notifications.create(null, notificationOptions, null);
                    buildRunning = false;
                }
            } else if (newestBuild.state === 'failing') {
                if (buildRunning === true) {
                    console.log('Build finished, build failing');
                    notificationOptions.title = 'Build Finished';
                    notificationOptions.message = 'Build failed';
                    chrome.notifications.create(null, notificationOptions, null);
                    buildRunning = false;
                }
            } else if (newestBuild.state === 'errored') {
                if (buildRunning === true) {
                    console.log('Build finished, build error');
                    notificationOptions.title = 'Build Error';
                    notificationOptions.message = 'Build was unable to complete due to an error';
                    chrome.notifications.create(null, notificationOptions, null);
                    buildRunning = false;
                }
            }
        });
}

function startPolling() {
    checkBuildStatus();
    window.setInterval(checkBuildStatus, 5000);
}

startPolling();
