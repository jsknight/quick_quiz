import Utilities from "../utilities/utils";

// ///////////////////////////////////////////////
// ///////////////////////////////////////////////
// REDUX ACTION METHODS 
// ///////////////////////////////////////////////
// ///////////////////////////////////////////////

export function fetchQuestions() {  
  return dispatch => {
      dispatch({
        type: "FETCH_QUESTIONS",
        payload: []
      });
      dispatch({
        type: "APP_LOADING",
        payload: true
      });
      Utilities.getData(
        "?amount=10&difficulty=hard&type=boolean", 
      function(response){     
        dispatch({
          type: "FETCH_QUESTIONS",
          payload: response
        });
        dispatch({
          type: "APP_LOADING",
          payload: false
        });
      });
  }
}

export function saveAnswer(answers, results, completed){
    return dispatch => {
      dispatch({
        type: "SAVE_ANSWERS",
        payload: answers
      });
      dispatch({
        type: "SAVE_RESULTS",
        payload: results
      });
      dispatch({
        type: "UPDATE_COMPLETED",
        payload: completed
      })
    }
}

export function resetQuiz(){
  console.log("resetQuiz Triggered");
    return dispatch => {
      dispatch({
        type: "RESET",
        payload: null
      })
    }
}