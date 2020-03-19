# Countdown

## What is this for?
I deliver workshops for [Canada Learning Code](https://canadalearningcode.ca), and I often find myself needing a timer for the work sessions within the workshops. All of the MacOS timers I've found so far either won't work on top of a full-screen app, or are glued to the top bar. This app overcomes both of these limitations.

## How do I use it?
You can set the time by hovering over the desired time unit (i.e. hours, minutes, or seconds) and scrolling. You can also click on the unit and adjust the time using the up and down arrow keys. Press "start" to kick off the timer!

## How does it work?
`Countdown` is an [electron](https://github.com/electron/electron) app that packages up an underlying [react](https://github.com/facebook/react) app. Overkill? Definitely. But I didn't want to go about learning Swift, and I'd been wanting to play around with electron/react.

## To do
- [ ] Make the app resizable
- [ ] Allow time entry with number keys
- [ ] Make the `Clock` component adhere to the [ARIA timer specification](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/ARIA_timer_role)
- [ ] Make available for Windows?
- [ ] Add colour control?

## Contributing

### Building the app
1. Clone the app
1. Install the dependencies: `yarn` or `npm install`
1. Run `yarn start` or `npm start` to start the development server
1. Run `yarn build` or `npm run build` to build the app (into the `dist/` folder)

## License
[MIT](/LICENSE)
