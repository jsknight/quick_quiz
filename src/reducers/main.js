const initialState = {
    loading: true,
    completed: false,
    results: {
        score: 0,
        correctAnswers: 0
    },
    answers: [],
    questions: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "APP_LOADING":
        return {
            ...state,
            loading: action.payload
        };
        case "FETCH_QUESTIONS":
            return {
                ...state,
                questions: action.payload
            };
        case "SAVE_ANSWERS":
            return {
                ...state,
                answers: action.payload
            };
        case "SAVE_RESULTS":
            return {
                ...state,
                results: action.payload
            };
        case "UPDATE_COMPLETED":
            return {
                ...state,
                completed: action.payload
            };
        case "RESET":
            return {
                ...state,
                loading: true,
                completed: false,
                results: {
                    score: 0,
                    correctAnswers: 0
                },
                answers: [],
                questions: [],
            };
        default:
            return state;
    }
}