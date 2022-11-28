let supportsCodegenConfig = false;

try {
  const rnCliAndroidVersion = require('@react-native-community/cli-platform-android/package.json')
    .version;
  const [major] = rnCliAndroidVersion.split('.');
  supportsCodegenConfig = major >= 9;
} catch (e) {
  // ignore
}

// this is a quick workaround for enabling custom codegen config in the fabric example app
// the require above picks up the version of the cli-platform-android package from the root node_modules
// instead of the one from the example app and doesn't correctly set the flag
// this, along with the patch to the rncli allows to run the fabric example properly
const codegenSwitch = '--enable-rnandroidprogressbar-codegen';
if (process.argv.includes(codegenSwitch)) {
  process.argv = process.argv.filter((arg) => arg !== codegenSwitch);
  supportsCodegenConfig = true;
}

module.exports = {
  project: {
    android: {sourceDir: './example/android'},
    ios: {project: './example/ios/example.xcworkspace'},
  },
  dependency: {
    platforms: {
      android: supportsCodegenConfig
        ? {
            componentDescriptors: ['RNCProgressBarComponentDescriptor'],
            cmakeListsPath: '../android/src/main/jni/CMakeLists.txt',
          }
        : {},
    },
  },
};
