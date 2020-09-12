import {
   ANSWER_ERROR,
   ANSWER_SUCCESS,
   FETCH_QUIZ_ERROR,
   FETCH_QUIZ_SUCCESS, FINISH_QUIZ, NEXT_QUESTION,
   RETRY_QUIZ
} from "./actionTypes";
import axios from "../../axios/axiosQuiz";

export function retryHandler(){
   return {type:RETRY_QUIZ};
}

export function isQuizFinished(quizLength, activeQuestion) {
   return quizLength === activeQuestion + 1;
}

export function fetchQuiz(quizId) {
   return async dispatch => {
      try {
         const response = await axios.get(`/quizes/${quizId}.json`);
         dispatch(fetchSuccess(response.data));
      } catch (e) {
         dispatch(fetchError(e));
      }
   }
}

function fetchSuccess(quiz) {
   return {
      type: FETCH_QUIZ_SUCCESS, quiz
   }
}

function fetchError(error) {
   return {
      type: FETCH_QUIZ_ERROR, error
   }
}

export function answerClickHandler(answerId, {answerState, quiz, activeQuestion, results}) {
   return dispatch => {
      if(answerState) {
         const key = Object.keys(answerState)[0];
         if(key === 'success') {
            return;
         }
      }

      const question = quiz[activeQuestion];

      if(question.rightAnswerId === answerId) {
         if(!results[question.id]) {
            results[question.id] = 'success';
         }
         dispatch({type: ANSWER_SUCCESS, answerId, results});

      } else {
         results[question.id] = 'error';
         dispatch({type: ANSWER_ERROR, answerId, results});
      }

      const timeout = window.setTimeout(()=>{
         if(isQuizFinished(quiz.length, activeQuestion)) {
            dispatch({type: FINISH_QUIZ});
         } else {
            dispatch({type: NEXT_QUESTION, activeQuestion});
         }
         window.clearTimeout(timeout);
      }, 1000);
   }

}
