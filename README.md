# Countdown
[![Countdown](https://circleci.com/github/adoxography/countdown.svg?style=shield)](https://app.circleci.com/pipelines/github/adoxography/countdown)

![Countdown screenshot](/docs/screenshot.png)

## What is this for?
I deliver workshops for [Canada Learning Code](https://canadalearningcode.ca), and I often find myself needing a timer for the work sessions within the workshops. All of the MacOS timers I've found so far either won't work on top of a full-screen app, or are glued to the top bar. This app overcomes both of these limitations.

## How do I use it?
### Installation
Download the app from the [releases](https://github.com/adoxography/countdown/releases/latest) page. The app isn't signed, so you can try running it anyway by following [these instructions](https://support.apple.com/en-ca/guide/mac-help/mh40616/mac). If that doesn't work, see the instructions below on how to build it yourself.

### Usage
Set the time by clicking on the desired time unit (i.e. hours, minutes, or seconds) and entering the desired time. You can also use the up and down arrow keys to add or remove time. Press "start" to kick off the timer!

## How does it work?
`Countdown` is an [electron](https://github.com/electron/electron) app that packages up an underlying [react](https://github.com/facebook/react) app. Overkill? Definitely. But I didn't want to go about learning Swift, and I'd been wanting to play around with electron/react.

## To do
- [x] Make the app resizable
- [x] Allow time entry with number keys
- [ ] Make the `Clock` component adhere to the [ARIA timer specification](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/ARIA_timer_role)
- [ ] Make available for Windows?
- [x] Add colour control?

## Contributing

### Building the app
Ensure [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node](https://nodejs.org/en/), and optionally [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) are installed. (I find it easiest to do this via [homebrew](https://brew.sh/).)

From the command line (i.e. `terminal`):
1. Clone the app: `git clone https://github.com/adoxography/countdown && cd countdown`
1. Install the dependencies: `yarn` or `npm install`
1. Run `yarn start` or `npm start` to start the development server
1. Run `yarn build` or `npm run build` to build the app (into the `dist/` folder)

## License
[MIT](/LICENSE)

## Acknowledgements
- SVGs for the digits were taken from [7 Segment Digital Clock - HTML + CSS + JS](https://www.youtube.com/watch?v=GlzDSCErJXs)(video)
- [How to build an Electron app using Create React App and Electron Builder](https://www.codementor.io/@randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer)
