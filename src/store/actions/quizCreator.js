import {ADD_NEW_QUESTION, CHANGE_RIGHT_ANSWER, CREATE_QUIZ, INPUT_CHANGE} from "./actionTypes";
import axios from "../../axios/axiosQuiz";
import {validate, validateForm} from "../../form/formFramework";

export function onInputChange(value, controlName, formControls) {
   const formControlsNew = {...formControls};
   const control = {...formControlsNew[controlName]};

   control.value = value;
   control.touched = true;
   control.valid = validate(control.value, control.validation);

   formControlsNew[controlName] = control;

   const isFormValid = validateForm(formControlsNew);

   return {type: INPUT_CHANGE, formControls: formControlsNew, isFormValid};
}

export function onSelectAnswer(event) {
   return {type: CHANGE_RIGHT_ANSWER, rightAnswerId: +event.target.value}
}

export function onSubmit(event) {
   event.preventDefault();
}

export function onAddQuestion(event, quiz, formControls, rightAnswerId) {
   return dispatch => {
      event.preventDefault();

      const quizNew = quiz.concat();
      const index = quizNew.length + 1;
      const {question, option1, option2, option3, option4} = formControls;

      const questionItem = {
         question: question.value,
         id: index,
         rightAnswerId: rightAnswerId,
         answers: [
            {text: option1.value, id: option1.id},
            {text: option2.value, id: option2.id},
            {text: option3.value, id: option3.id},
            {text: option4.value, id: option4.id}
         ]
      };

      quizNew.push(questionItem);

      dispatch({type: ADD_NEW_QUESTION, quiz: quizNew});
   }
}

export function onCreateQuiz(event, quiz) {
   return async dispatch => {
      event.preventDefault();

      try {
         await axios.post('/quizes.json', quiz);
         dispatch({type: CREATE_QUIZ});
      } catch (e) {
         console.log(e)
      }
   }
}
