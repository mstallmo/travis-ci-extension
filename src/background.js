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
            let newestBuild = data[data.builds.length - 1];
            if (newestBuild.state === 'started') {
                chrome.browserAction.setBadgeText({text: '1'});
            } else {
                chrome.browserAction.setBadgeText({text: ''});
            }
        });
}

function startPolling() {
    checkBuildStatus();
    window.setTimeout(checkBuildStatus, 5000);
}

startPolling();
