import React, { Component } from 'react';
import pizzaTruck from './pizza-truck.png';
import Card from './cards/Cards.js';

const cardStyle = {
    padding: '5px'
};

const topBarStyle = {
    backgroundColor: '#6a7873',
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

        fetch('https://api.travis-ci.org/builds?limit=5', options)
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

    render() {
        return (
            <div className="App">
                <header>
                    <div style={topBarStyle}>
                        <div>
                            <a>
                                <img src={pizzaTruck} alt={'Icon of a truck with pizza on top'}/>
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
