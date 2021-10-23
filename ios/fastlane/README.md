fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios sync_development_certs
```
fastlane ios sync_development_certs
```
Sync Apple development certs with match
### ios tests
```
fastlane ios tests
```
Run iOS Tests
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight
### ios beta2
```
fastlane ios beta2
```
Push a new beta build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
