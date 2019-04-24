
# react-native-androidprogressbar

## Getting started

`$ npm install react-native-androidprogressbar --save`

### Mostly automatic installation

`$ react-native link react-native-androidprogressbar`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-androidprogressbar` and add `RNCAndroidprogressbar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCAndroidprogressbar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactnativecommunity.androidprogressbar.RNCAndroidprogressbarPackage;` to the imports at the top of the file
  - Add `new RNCAndroidprogressbarPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-androidprogressbar'
  	project(':react-native-androidprogressbar').projectDir = new File(rootProject.projectDir, 	'../../node_modules/react-native-androidprogressbar/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-androidprogressbar')
  	```


## Usage
```javascript
import RNCAndroidprogressbar from 'react-native-androidprogressbar';

// TODO: What to do with the module?
RNCAndroidprogressbar;
```
  