import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {validate, validateForm} from "../../form/formFramework";

class Auth extends Component {
   state = {
      isFormValid: false,
      formControls: {
         email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false,
            validation: {
               required: true,
               email: true
            }
         },
         password: {
            value: '',
            type: 'password',
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
               required: true,
               minLength: 6
            }
         }
      }
   };

   onChangeHandler = (event, controlName) => {
      const formControls = {...this.state.formControls};
      const control = {...formControls[controlName]};

      control.value  = event.target.value;
      control.touched = true;
      control.valid = validate(control.value, control.validation);

      formControls[controlName] = control;

      const isFormValid = validateForm(formControls);

      this.setState({
         formControls, isFormValid
      });
   };

   renderInputs () {
      return Object.keys(this.state.formControls).map((controlName, index) => {
         const control = this.state.formControls[controlName];
         return (
            <Input
               key={controlName + index}
               type={control.type}
               value={control.value}
               valid={control.valid}
               touched={control.touched}
               label={control.label}
               errorMessage={control.errorMessage}
               shouldValidate={!!control.validation}
               onChange={event => {
                  this.onChangeHandler(event, controlName)
               }}
            />
         )
      });
   };

   loginHandler = () => {

   };

   registerHandler = () => {

   };

   submitHandler = event => {
      event.preventDefault();
   };

   render() {
      return (
         <div className={classes.Auth}>
            <div>
               <h1>Авторизация</h1>

               <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                  {this.renderInputs()}

                  <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
                  <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
               </form>
            </div>
         </div>
      );
   }
}

export default Auth;
