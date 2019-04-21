import React from 'react';
import { StyleSheet, ActivityIndicator, View , Text} from 'react-native';
import { NativeRouter, Route, Link, BackButton } from "react-router-native";
import { Provider } from "react-redux";
import configureStore from "./src/boot/configureStore";
import Index from "./src/screens/Index";
import Questions from "./src/screens/Questions";
import Results from "./src/screens/Results";
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from "@expo/vector-icons";

const store = configureStore();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/icon.png'),
    ]);

    const fontAssets = cacheFonts([Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  
  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.container}>
            <BackButton />
            <Route exact path='/' component={Index} />
            <Route  path='/questions' component={Questions} />
            <Route  path='/results' component={Results} />
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
