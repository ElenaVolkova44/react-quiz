import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink, useHistory} from "react-router-dom";
import axios from '../../axios/axiosQuiz';
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {
   state = {
      quizes: [],
      loading: true
   };

   renderQuizes() {
      return this.state.quizes.map((quiz) => {
         return (
            <li
               key={quiz.id}
            >
               <NavLink to={'/quiz/' + quiz.id} toListHandler={this.toListHandler}>
                  {quiz.name}
               </NavLink>
            </li>
         )
      })
   }


   toListHandler = () => {
      useHistory().push("/");
   };

   async componentDidMount() {
      try {
         const response = await axios.get('/quizes.json');

         const quizes = [];

         Object.keys(response.data).forEach((key, index) => {
            quizes.push({
               id: key, name: `Тест №${index + 1}`
            });
         });

         this.setState({quizes, loading: false});
      } catch (e) {
         console.log(e);
      }
   }

   render() {
      return (
         <div className={classes.QuizList}>
            {this.state.loading ? <Loader/> :
               (<div>
                  <h1>Список тестов</h1>
                  <ul>
                     {this.renderQuizes()}
                  </ul>
               </div>)
            }
         </div>
      );
   }
}

export default QuizList;
