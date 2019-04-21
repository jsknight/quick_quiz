import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProgressBar from "./ProgressBar";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export default class QuestionComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null,
      progress: 10
    };
  }

  updateProgress = () => {
      this.setState({
        progress : this.state.progress + 10
      });
  }

  markAnswer = (val) => {
    this.props.onSelect(val);
    this.updateProgress();
  }

  render() {
    return (
        <SafeAreaView style={styles.safe}>
            <ProgressBar
                fillStyle={{
                    backgroundColor: "#f33d73"
                }}
                style={{marginTop: 0, width: "100%", marginBottom:30}}
                backgroundStyle={{backgroundColor: "#bbb", borderRadius: 0}}
            progress={this.state.progress}
            />
            <View style={styles.container}>

                <View style={styles.category_bar}>
                    <Text style={styles.category}>
                    { entities.decode(this.props.question.category) }
                    </Text>
                </View>
                
                <View style={styles.question_block}>
                    <Text style={styles.question}>
                    { entities.decode(this.props.question.question) }
                    </Text>
                </View>

                <View style={styles.answer_block_wrap} >
                    <View style={styles.answer_block}>
                        <TouchableOpacity style={styles.answer_button} onPress={() => this.markAnswer("True")}>
                            <Text style={styles.answer_button_text}>TRUE</Text>
                        </TouchableOpacity>
                        <Text style={styles.or}>or</Text>
                        <TouchableOpacity style={styles.answer_button} onPress={() => this.markAnswer("False")}>
                            <Text style={styles.answer_button_text}>FALSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1, 
        padding: 0,
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1, 
        padding: 0,
        display:"flex",
        flexDirection: "column",
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    category_bar: {
        marginBottom: 20
    },
    category:{
        fontSize: 26,
        fontWeight: "bold",
    },
    question_block: {
        padding:10,
        flex: 1,
        justifyContent: "center",
    },
    question: {
        fontSize: 24, 
        fontWeight: "bold", 
        color: "#333"
    },
    answer_block_wrap:{
        flex: 1,
        width: "100%",
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    answer_block: {
        flex:1,
        padding:10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    answer_button: {
        flex: 1,
        margin: 5,
        backgroundColor: "#333",
        padding:5, 
        height: 50,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#222"
    },
    answer_button_text:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
    or:{
        padding:10
    },
    back_button:{
        width: "100%",
    }
});