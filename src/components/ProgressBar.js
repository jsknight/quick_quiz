import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';

export default class ProgressBar extends React.Component {

    constructor(){
        super();
        this.state = {
            progress: new Animated.Value(0)
        };
    }

    componentDidMount(){
        this.setState({
            progress: new Animated.Value(this.props.progress)
        })
        this.updateBar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
          this.updateBar();
        }
    }

    updateBar = () =>  {
        Animated.timing(this.state.progress, {
            easing: Easing.inOut(Easing.ease),
            duration: 500,
            toValue: this.props.progress
        }).start();
    }

    render() {
        var fillWidth = this.state.progress.interpolate({
          inputRange: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          outputRange: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        });

        console.log("fillWidth");
        console.log(fillWidth);
    
        return (
            <View style={[styles.background, this.props.style, this.props.backgroundStyle]}>
                <Animated.View style={[styles.fill, this.props.fillStyle, { flex: fillWidth }]}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 15,
    overflow: 'hidden',
    flexDirection: "row",
  },
  fill: {
    backgroundColor: 'green',
    height: 15
  }
});