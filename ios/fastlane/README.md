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
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
### ios build
```
fastlane ios build
```
Fetch certificates. Build the iOS application.
### ios beta3
```
fastlane ios beta3
```
Ship to Testflight.
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
### ios beta4
```
fastlane ios beta4
```
Push a new release build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
