import React from "react";
import {
    StyleSheet, 
    SafeAreaView,
    Text, 
    View, 
    FlatList,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from 'react-redux';
import { resetQuiz } from "../actions"
import { Redirect} from "react-router-native";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// RESULTS PAGE 
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

class App extends React.Component {

  _keyExtractor = (item, index) => item.id.toString()

  render() {

    // After "Play Again" button is pressed and Quiz has 
    // been cleared redirect back to Index to satrt again
    if (this.props.completed === false){ 
      return <Redirect to='/' />
    }

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>  
          <View style={styles.result_bar}>
              <Text style={styles.result_title}>Quiz Completed</Text>
              <Text>You answered {this.props.results.correctAnswers} / 10 correctly</Text>
          </View>                    
          <View style={styles.results_block}>
            { this.props.answers.length > 0 && (
              <FlatList
              style={{marginBottom: 30}}
                data={this.props.answers}
                keyExtractor={this._keyExtractor}
                renderItem={(row) => {
                  return (
                    <View style={styles.answer_row}>
                        <View style={styles.answer_row_details}>
                          <Text style={styles.answer_row_question}>{entities.decode(row.item.question.question)}</Text>
                        </View>
                        <View style={styles.answer_row_icon}>
                          {row.item.is_correct 
                            ? <Ionicons name="md-checkmark" size={32} color="green" />
                            : <Ionicons name="md-close" size={32} color="red" />
                          }
                        </View>
                    </View>
                  )}
                }
              />
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.restart_button} onPress={() => this.props.resetQuiz() }>
                <Text style={styles.restart_button_text}>PLAY AGAIN?</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: '#FFF',
        height: "100%",
        width: "100%",
    },
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        padding: 0,
        flex:1,
        flexDirection: 'column'
    },
    result_bar: {
      flex:1,
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    results_block:{
      flex:8
    },
    result_title:{
        fontSize: 26,
        fontWeight: "bold",
        marginBottom:5
    },
    title_row:{
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
    },
    answer_row:{
      elevation: 1,
      borderRadius: 0,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 6,
    },
    answer_row_icon:{
      flex: 2,
      justifyContent: "center",
      alignSelf: "center",
      alignItems:"center",      
    },
    answer_row_details:{
      padding:5,
      flex: 8
    },
    answer_row_question:{
      fontSize: 16,
      color: "#333"
    },
    footer:{
      flex:1,
      padding: 10
    },
    restart_button:{
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
    restart_button_text:{
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFF",
    }
});

function mapStateToProps(state){
    return{
        completed: state.main.completed,
        answers: state.main.answers,
        results: state.main.results
    }
};

function bindAction(dispatch){
    return {
        resetQuiz: () => dispatch(resetQuiz())        
    }
}


export default connect(mapStateToProps, bindAction)(App);