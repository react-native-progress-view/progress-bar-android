# @react-native-community/progress-bar-android

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
![Supports Android][support-badge]
[![MIT License][license-badge]][license]
[![Lean Core Badge][lean-core-badge]][lean-core-issue]

Progress Bar Component for Android Devices

![Screenshot](https://user-images.githubusercontent.com/25158423/57262658-0d4c5b00-703b-11e9-9e0d-bdf7cb8f942a.gif)

## Getting started

```
npm install @react-native-community/progress-bar-android --save

# or

yarn add @react-native-community/progress-bar-android
```

### Linking

- React Native 0.60+

The package is [automatically linked](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) when building the app. All you need to do is:

```
npx pod-install
```

- React Native <= 0.59

Run the following commands

```
$ react-native link @react-native-community/progress-bar-android
```

### Manual installation

<details>
<summary>Manually linking the library - iOS</summary>

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@react-native-community/progress-bar-android` and add `RNCProgressBar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNCProgressBar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)

</details>

<details>
<summary>Manually link the library - android</summary>

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;` to the imports at the top of the file
- Add `new RNCProgressBarPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':@react-native-community_progress-bar-android'
   project(':@react-native-community_progress-bar-android').projectDir = new File(rootProject.projectDir, 	'../../node_modules/@react-native-community/progress-bar-android/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     implementation project(':@react-native-community_progress-bar-android')
   ```

</details>

## Trying out this package in `example`

### Android

1. Install dependencies
1. Install dependencies for example folder
1. Start the metro bundler
1. Build the application

```sh
yarn install
yarn start
yarn android
```

# Example

```jsx
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
        <ProgressBar />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBar styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBar styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});
```

# Reference

## Props

Inherits [View Props](https://reactnative.dev/docs/view#props).

### `animating`

Whether to show the ProgressBar (true, the default) or hide it (false).

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

Color of the progress bar.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `indeterminate`

If the progress bar will show indeterminate progress. Note that this can only be false if styleAttr is Horizontal, and requires a `progress` value.

| Type              | Required |
| ----------------- | -------- |
| indeterminateType | No       |

---

### `progress`

The progress value (between 0 and 1).

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `styleAttr`

Style of the ProgressBar. One of:

- Horizontal
- Normal (default)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Type                                                                                      | Required |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

[build-badge]: https://img.shields.io/circleci/project/github/react-native-community/progress-bar-android/master.svg?style=flat-square
[build]: https://circleci.com/gh/react-native-community/progress-bar-android
[version-badge]: https://img.shields.io/npm/v/@react-native-community/progress-bar-android.svg?style=flat-square
[package]: https://www.npmjs.com/package/@react-native-community/progress-bar-android
[support-badge]: https://img.shields.io/badge/platforms-android-lightgrey.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@react-native-community/progress-bar-android.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[lean-core-badge]: https://img.shields.io/badge/Lean%20Core-Extracted-brightgreen.svg?style=flat-square
[lean-core-issue]: https://github.com/facebook/react-native/issues/23313
