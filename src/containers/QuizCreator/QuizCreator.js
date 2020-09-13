import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {onAddQuestion, onCreateQuiz, onInputChange, onSelectAnswer, onSubmit} from "../../store/actions/quizCreator";

class QuizCreator extends Component {

   renderInputs() {
      return Object.keys(this.props.formControls).map((controlName, index) => {
         const control = this.props.formControls[controlName];
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
                     this.props.onInputChange(event.target.value, controlName, this.props.formControls)
                  }}
               />
               {!index && <hr/>}
            </React.Fragment>
         )
      });
   };

   render() {
      const select = <Select
         label="Выберите правильный ответ"
         value={this.props.rightAnswerId}
         onChange={this.props.onSelectAnswer}
         options={[
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
               <form onSubmit={this.props.onSubmit}>

                  {this.renderInputs()}

                  {select}

                  <Button
                     type="primary"
                     onClick={event => this.props.onAddQuestion(event, this.props.quiz, this.props.formControls, this.props.rightAnswerId)}
                     disabled={!this.props.isFormValid}
                  >
                     Добавить вопрос
                  </Button>

                  <Button
                     type="success"
                     onClick={event => this.props.onCreateQuiz(event, this.props.quiz)}
                     disabled={!this.props.quiz.length}
                  >
                     Создать тест
                  </Button>
               </form>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      isFormValid: state.quizCreator.isFormValid,
      quiz: state.quizCreator.quiz,
      rightAnswerId: state.quizCreator.rightAnswerId,
      formControls: state.quizCreator.formControls
   }
}

function mapDispatchToProps(dispatch) {
   return {
      onInputChange: (value, controlName, formControls) => dispatch(onInputChange(value, controlName, formControls)),
      onSelectAnswer: (event) => dispatch(onSelectAnswer(event)),
      onSubmit: (event) => dispatch(onSubmit(event)),
      onAddQuestion: (event, quiz, formControls, rightAnswerId) => dispatch(onAddQuestion(event, quiz, formControls, rightAnswerId)),
      onCreateQuiz: (event, quiz) => dispatch(onCreateQuiz(event, quiz))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
