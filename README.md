# Chrome Speech-to-Text

This agent uses Google Chrome's speech to text capabilities to provide voice recognition for [Zeus](http://xiproject.github.io/zeus).

## Prerequisites

- Google Chrome
- node v0.10
- [bunyan] for pretty printed logs

## Installation

1. Install the [Chrome app].

2. Clone this repo and run `npm install`.

## Run

1. Run Chrome and start the app.

2. Run the Chrome STT agent with:

```sh
$ node index.js --logfile chrome-stt.log 2>&1 | bunyan
```

## Caveats

- Chrome STT uses Google speech recognition built into Google Chrome to do speech-to-text. It is listening as long as the Chrome app is running, and all the while your microphone stream is being sent to Google.

[Chrome app]: https://chrome.google.com/webstore/detail/xi/pdifndlbcogjdkhobdinhfnclkanelbo
[bunyan]: https://github.com/trentm/node-bunyan

## License
GPLv3
