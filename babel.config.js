module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@react-native-community/progress-bar-android": "./js"
          },
          cwd: "babelrc"
        }
      ]
    ]
};
