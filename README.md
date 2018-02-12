This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Chrome Browser Extension For Monitoring Travis CI builds

Delivery Guy is a browser extension for Google Chrome that provides updates on
TravisCI builds.

The popup window displays the last 5 builds from TravisCI as well as displaying
a notification badge for currently running builds.

### Usage

Currently the TravisCI API doesn't allow for OAuth sign in authentication. Because
of this you will need to use the TravisCI CLI tool to generate an authentication
token to be used when interfacing with the API. You can find the instructions
for using the CLI to generate a token here.

After generating the TravisCI token navigate to settings>authentication and enter
the notification to allow Delivery Guy to access the TravisCI on your behalf.

If you want to build the extension from source and run it in your own browser
first clone or fork the repository. Once the repo is cloned/forked, cd into the
project folder and run `yarn install` to install all of the dependencies.
After finishing dependency installation, run `yarn build`. All output will be
placed in the `/build` folder. To install in Chrome, navigate to
`chrome://extensions` and toggle developer mode to load an unpacked extension.
Once Chrome is in developer mode, drag the build folder into the `chrome://extensions`
page and the extension will appear in the browser.

### Changelog
