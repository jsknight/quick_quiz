import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, BackButton } from "react-router-native";
import Index from "./src/screens/Index";
import Questions from "./src/screens/Questions";
import Results from "./src/screens/Results";


export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <BackButton />
          <Route exact path='/' component={Index} />
          <Route  path='/questions' component={Questions} />
          <Route  path='/results' component={Results} />
        </View>
      </NativeRouter>
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
