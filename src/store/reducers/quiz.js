import {
   FETCH_QUIZ_ERROR,
   FETCH_QUIZ_SUCCESS,
   RETRY_QUIZ,
   ANSWER_SUCCESS, ANSWER_ERROR, FINISH_QUIZ, NEXT_QUESTION
} from "../actions/actionTypes";

const initialState = {
   results: {}, // {[id]: 'success'||'error'}
   isFinished: false,
   activeQuestion: 0,
   answerState: null, // {[id]: 'success'||'error'}
   quiz: [],
   loading: true,
   error: null
};

export default function quizReducer(state = initialState, action) {
   switch (action.type) {
      case RETRY_QUIZ: {
         return {
            ...state,
            results: {}, // {[id]: 'success'||'error'}
            isFinished: false,
            activeQuestion: 0,
            answerState: null, // {[id]: 'success'||'error'}
         }
      }
      case FETCH_QUIZ_SUCCESS:
         return {
            ...state, loading: false, quiz: action.quiz
         };
      case FETCH_QUIZ_ERROR:
         return {
            ...state, loading: false, error: action.error
         };
      case ANSWER_SUCCESS:
         return {
            ...state,
            answerState: {[action.answerId]: 'success'},
            results: action.results
         };
      case ANSWER_ERROR:
         return {
            ...state,
            answerState: {[action.answerId]: 'error'},
            results: action.results
         };
      case FINISH_QUIZ:
         return {
            ...state,
            isFinished: true
         };
      case NEXT_QUESTION:
         return {
            ...state,
            activeQuestion: action.activeQuestion + 1,
            answerState: null
         };
      default: {
         return state;
      }
   }
}
