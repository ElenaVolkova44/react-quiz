import {combineReducers} from "redux";
import quizListReducer from "./quizList";
import quizReducer from "./quiz";
import quizCreatorReducer from "./quizCreator";

export default combineReducers(
   {
      quizList: quizListReducer,
      quiz: quizReducer,
      quizCreator: quizCreatorReducer
   }
)
