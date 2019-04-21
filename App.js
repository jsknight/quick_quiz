import React from 'react';
import { StyleSheet, ActivityIndicator, View , Text} from 'react-native';
import { NativeRouter, Route, Link, BackButton } from "react-router-native";
import { Provider } from "react-redux";
import configureStore from "./src/boot/configureStore";
import Index from "./src/screens/Index";
import Questions from "./src/screens/Questions";
import Results from "./src/screens/Results";

const store = configureStore()

export default class App extends React.Component {
  render() {
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
