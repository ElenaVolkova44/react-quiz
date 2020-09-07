import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from "../../components/UI/Button/Button";
import {createControl} from '../../form/formFramework';
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {validate, validateForm} from "../../form/formFramework";

function createOptionControl(number) {
   return createControl({
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number
   }, {
      required: true
   })
}

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

class QuizCreator extends Component {

   state = {
      isFormValid: false,
      quiz: [],
      rightAnswerId: 1,
      formControls: createFormControls()
   };

   submitHandler = event => {
      event.preventDefault();
   };

   onAddQuestionHandler = event => {
      event.preventDefault();

      const quiz = this.state.quiz.concat();
      const index = quiz.length + 1;
      const {question, option1, option2, option3, option4} = this.state.formControls;

      const questionItem = {
         question: question.value,
         id: index,
         rightAnswerId: this.state.rightAnswerId,
         answers: [
            {text: option1.value, id: option1.id},
            {text: option2.value, id: option2.id},
            {text: option3.value, id: option3.id},
            {text: option4.value, id: option4.id}
         ]
      };

      quiz.push(questionItem);
      this.setState({
         quiz,
         isFormValid: false,
         rightAnswerId: 1,
         formControls: createFormControls()
      })
   };

   createQuizHandler = event => {
      event.preventDefault();

      console.log(this.state.quiz)
   };

   onChangeHandler = (value, controlName) => {
      const formControls = {...this.state.formControls};
      const control = {...formControls[controlName]};

      control.value  = value;
      control.touched = true;
      control.valid = validate(control.value, control.validation);

      formControls[controlName] = control;

      const isFormValid = validateForm(formControls);

      this.setState({
         formControls, isFormValid
      });
   };

   renderInputs() {
      return Object.keys(this.state.formControls).map((controlName, index) => {
         const control = this.state.formControls[controlName];
         return (
            <React.Fragment key={controlName + index}>
               <Input
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  label={control.label}
                  errorMessage={control.errorMessage}
                  shouldValidate={!!control.validation}
                  onChange={event => {
                     this.onChangeHandler(event.target.value, controlName)
                  }}
               />
               {!index && <hr/>}
            </React.Fragment>
         )
      });
   };

   selectChangeHandler = event => {
      this.setState({
         rightAnswerId: +event.target.value
      })
   };

   render() {
      const select = <Select
         label="Выберите правильный ответ"
         value={this.state.rightAnswerId}
         onChange={this.selectChangeHandler}
         options = {[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
         ]}
      />;

      return (
         <div className={classes.QuizCreator}>
            <div>
               <h1>QuizCreator</h1>
               <form onSubmit={this.submitHandler}>

                  {this.renderInputs()}

                  {select}

                  <Button
                     type="primary"
                     onClick={this.onAddQuestionHandler}
                     disabled={!this.state.isFormValid}
                  >
                     Добавить вопрос
                  </Button>

                  <Button
                     type="success"
                     onClick={this.createQuizHandler}
                     disabled={!this.state.quiz.length}
                  >
                     Создать тест
                  </Button>
               </form>
            </div>
         </div>
      );
   }
}

export default QuizCreator;
