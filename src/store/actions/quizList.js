import axios from "../../axios/axiosQuiz";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes(){
   return async dispatch => {
      dispatch(fetchQuizesStart());
      try {
         const response = await axios.get('/quizes.json');

         const quizes = [];

         Object.keys(response.data).forEach((key, index) => {
            quizes.push({
               id: key, name: `Тест №${index + 1}`
            });
         });

         dispatch(fetchQuizesSuccess(quizes));
      } catch (error) {
         dispatch(fetchQuizesError(error));
      }
   }
}

function fetchQuizesStart() {
   return {
      type: FETCH_QUIZES_START
   }
}

function fetchQuizesSuccess(quizes) {
   return {
      type: FETCH_QUIZES_SUCCESS, quizes
   }
}

function fetchQuizesError(error) {
   return {
      type: FETCH_QUIZES_ERROR, error
   }
}
