/*global chrome*/

import React, { Component } from 'react';
import icon from './icon.png';
import pizzaTruck from './pizza-truck.png';
import Card from './cards/Cards.js';

const cardStyle = {
    padding: '5px'
};

const topBarStyle = {
    backgroundColor: '#19d799',
    color: '#ffffff',
    height: '36px',
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingLeft: '7px'
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            builds: []
        };

        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    componentDidMount() {
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
            let builds = data.builds.map((build) => {
                return (
                    <div style={cardStyle}>
                        <Card branchName={build.branch.name}
                              commitMessage={build.commit.message}
                              buildNumber={build.number}
                              buildState={build.state}
                              />
                    </div>
                )
            })
            this.setState({builds: builds});
        });
    }

    onButtonClicked() {
        const notificationOptions = {
            type: 'basic',
            iconUrl: icon,
            title: 'Test Notification',
            message: 'Test Message'
        }
        chrome.notifications.create(null, notificationOptions, null);
    }

    render() {
        return (
            <div className="App">
                <header>
                    <div style={topBarStyle}>
                        <div>
                            <a>
                                <img src={pizzaTruck} />
                                {' Delivery Guy'}
                            </a>
                        </div>
                    </div>
                </header>
                {this.state.builds}
            </div>
        );
    }
}

export default App;
