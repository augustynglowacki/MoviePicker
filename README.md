# MoviePicker

MoviePicker is a React Native application where you can browse movies and tv series, see what is popular right now, create a watchlist, set up your user profile, etc.

[![Movie-Picker.png](https://i.postimg.cc/9fqRNvSM/Movie-Picker.png)](https://postimg.cc/VSmkJHzQ)

Demo (Android APK): [MoviePicker v1.0.1.apk](https://bit.ly/3dGdI7C)

Tech stack used in this project:
- Typescript, React Native
- Firebase
- Redux Thunk + Toolkit
- Jest, React Testing Library, Enzyme
- Prettier, ESLint and Husky
- Formik, react-native-reanimated 2, i18n

### Before you start

***Movie Picker*** requires a couple of previous steps to start with the installation. 

- You will need to have [npm](https://www.npmjs.com/) to install the application dependencies. If you don't have it, please follow [these](https://www.npmjs.com/get-npm) steps to install it.
- You will need to belong to an Apple organization development team for this project in order to run the application on iOS. 
- Also, this is a React Native project, so you must install React Native. Follow [these](https://facebook.github.io/react-native/docs/getting-started.html#content) steps to do it.

### Installation

1. Clone the repo locally:

```sh
git clone git@github.com:...........
```

2. Navigate into project
```sh
cd app-name
```

3. Install dependencies
```sh
npm install
```

4. Configurate iOS project
```sh
cd ios
pod install
```

5. Go back to main project folder
```sh
cd ..
```

### Run application

##### iOS #####
1. Open application in xcode
```sh
cd ios
open <App-name>.xcworkspace
```

2. Configure signing on project target
- Tap on app-name project
- Tap Signing & Capabilities tab
- Tap on app-name target
- On Team field, choose the development team from your apple account

3. Run the application: Product -> Run or just the play button

##### Android #####

1. Connect the device to your computer
2. Run application
```sh
npm run android
```

### Run tests
1. Navigate into main project folder
2. Execute tests
```sh
npm run test
```
