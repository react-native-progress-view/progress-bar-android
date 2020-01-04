
# @react-native-community/progress-bar-android

[![Lean Core Badge][lean-core-badge]][lean-core-issue]

## Getting started

`$ npm install @react-native-community/progress-bar-android --save`

or

`$ yarn add @react-native-community/progress-bar-android`

## Example setup
![](https://user-images.githubusercontent.com/25158423/57262658-0d4c5b00-703b-11e9-9e0d-bdf7cb8f942a.gif)

### Android
1. Install dependencies
1. Install dependencies for example folder
1. Start the metro bundler
1. Build the application

```sh
yarn install
cd example
# inside example
yarn install
yarn start
yarn android
```

### Mostly automatic installation

`$ react-native link @react-native-community/progress-bar-android`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@react-native-community/progress-bar-android` and add `RNCAndroidprogressbar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCAndroidprogressbar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactnativecommunity.androidprogressbar.RNCAndroidprogressbarPackage;` to the imports at the top of the file
  - Add `new RNCAndroidprogressbarPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':@react-native-community_progress-bar-android'
  	project(':@react-native-community_progress-bar-android').projectDir = new File(rootProject.projectDir, 	'../../node_modules/@react-native-community/progress-bar-android/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':@react-native-community_progress-bar-android')
  	```


## Usage
```jsx
import { View } from 'react-native'
import { ProgressBar } from '@react-native-community/progress-bar-android';


export const Example = () => {
	return (
		<View>
			<ProgressBar styleAttr="Horizontal" />
		</View>
	)
}

```
  
[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313