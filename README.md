# webmunk.github.io

This repository contains a simple webpage used to track the uninstallation of a browser extension by user ID.

## What is it?

- The page accepts a `userId` parameter in the URL.
- It sends a request to a backend service to check if the user has already uninstalled the extension.
- If the uninstall is not yet tracked, it sends an event to an analytics service (RudderStack).
- Displays a thank you message for participating in the study.

## How to use

Open the page with the `userId` and `key` query parameters, for example:
`https://webmunk.github.io/?key=sephora&userId=1234567890`

The page will automatically track the uninstall event if it hasn’t been recorded before.