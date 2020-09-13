import {createControl} from "../../form/formFramework";
import {ADD_NEW_QUESTION, CHANGE_RIGHT_ANSWER, CREATE_QUIZ, INPUT_CHANGE} from "../actions/actionTypes";

const initialState = {
   isFormValid: false,
   quiz: [],
   rightAnswerId: 1,
   formControls: createFormControls()
};

function createFormControls() {
   return {
      question: createControl({
         label: 'Введите вопрос',
         errorMessage: 'Вопрос не может быть пустым'
      }, {
         required: true
      }),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4: createOptionControl(4)
   }
}

function createOptionControl(number) {
   return createControl({
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number
   }, {
      required: true
   })
}

export default function quizCreatorReducer(state = initialState, action) {
   switch (action.type) {
      case ADD_NEW_QUESTION:
         return {
            ...state,
            quiz: action.quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
         };

      case CREATE_QUIZ:
         return {
            ...state,
            isFormValid: false,
            quiz: [],
            rightAnswerId: 1,
            formControls: createFormControls()
         };
      case CHANGE_RIGHT_ANSWER:
         return {
            ...state, rightAnswerId: action.rightAnswerId
         };
      case INPUT_CHANGE:
         return {
            ...state, formControls: action.formControls, isFormValid: action.isFormValid
         };
      default:
         return {...state}
   }
}
