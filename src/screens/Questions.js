import React from "react";
import {
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator,
    Button
} from "react-native";
import { connect } from 'react-redux';
import Question from "../components/QuestionComponent";
import { fetchQuestions, saveAnswer, saveQuiz } from "../actions"
import { Redirect} from "react-router-native";

class App extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            current: 0,
            correctScore: 10,
            totalScore: 100,
        };
    }


    resetQuiz = () => {
        this.setState(
          {
            current: 0,
          },
          () => {
            this.props.fetchQuestions();
          }
        );
    };

    submitAnswer = (index, answer) => {
        const question = this.props.questions[index];
        const isCorrect = question.correct_answer === answer;
        const results = { ...this.props.results };
        results.score = isCorrect ? results.score + 10 : results.score;
        results.correctAnswers = isCorrect ? results.correctAnswers + 1 : results.correctAnswers;
        const current_answer = {
            "id": index,
            "question" : question,
            "is_correct": isCorrect
        };

        this.props.answers.push(current_answer);
        this.props.saveAnswer(this.props.answers, results, index === 9 ? true : false);
        this.setState({
          current: index + 1,
        });
    };

    componentDidMount() {
        this.props.fetchQuestions();
    }

    render() {
        if (this.props.completed === true){
            return <Redirect to='/results' />
        }

        return (
          <View style={styles.container}>
            {!!this.props.loading && (
                <View style={styles.loader}>
                    <ActivityIndicator style={styles.indicator} size="large" color="#f33d73" />
                    <Text style={styles.loader_text}>Setting up your questions.</Text>
                    <Text style={styles.loader_text}>Please Wait</Text>
                </View>
            )}

            {!!this.props.questions.length > 0 && this.props.completed === false && (
                <Question onSelect={answer => { this.submitAnswer(this.state.current, answer)}}
                    question={this.props.questions[this.state.current]}
                    correctPosition={Math.floor(Math.random() * 3)}
                    current={this.state.current}
                />
            )}
            
            {!this.props.loading &&  this.props.completed === true && (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                    {this.props.completed === true && (
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 25 }}>Quiz Completed</Text>
                            <Text>Correct Answers: {this.props.results.correctAnswers}</Text>
                            <Text>Incorrect Answers: {10 - this.props.results.correctAnswers} </Text>
                            <Text>Obtained Score: {this.props.results.score}%</Text>
                            <Button title="Restart Quiz" onPress={() => this.resetQuiz() } />
                        </View>
                    )}
                </View>
            )}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
        backgroundColor: 'white'
    },
    loader: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
        alignItems: "center",
        justifyContent: "center",
    },
    indicator: {
        marginBottom: 20
    },
    loader_text: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#666"
    }
});

function mapStateToProps(state){
    return{
        loading: state.main.loading,
        completed: state.main.completed,
        questions: state.main.questions,
        answers: state.main.answers,
        results: state.main.results
    }
};

function bindAction(dispatch){
    return {
        fetchQuestions: () => dispatch(fetchQuestions()),
        saveAnswer: (answers, results, completed) => dispatch(saveAnswer(answers, results, completed))
    }
}


export default connect(mapStateToProps, bindAction)(App);