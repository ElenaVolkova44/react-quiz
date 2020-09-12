import {combineReducers} from "redux";
import quizListReducer from "./quizList";
import quizReducer from "./quiz";

export default combineReducers(
   {
      quizList: quizListReducer,
      quiz: quizReducer
   }
)
