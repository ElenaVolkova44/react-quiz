import React, {Component} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axiosQuiz';
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
   state = {
      results: {}, // {[id]: 'success'||'error'}
      isFinished: false,
      activeQuestion: 0,
      answerState: null, // {[id]: 'success'||'error'}
      quiz: [],
      loading: true
   };

   isQuizFinished = () =>{
      return this.state.quiz.length === this.state.activeQuestion + 1;
   };

   async componentDidMount() {
      try {
         const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);

         this.setState({quiz: response.data, loading: false});
      } catch (e) {
         console.log(e);
      }
   }

   onAnswerClickHandler = (answerId) => {
      if(this.state.answerState) {
         const key = Object.keys(this.state.answerState)[0];
         if(key === 'success') {
            return;
         }
      }

      const question = this.state.quiz[this.state.activeQuestion];
      const results = this.state.results;

      if(question.rightAnswerId === answerId) {
         if(!results[question.id]) {
            results[question.id] = 'success';
         }
         this.setState({
            answerState: {[answerId]: 'success'},
            results
         });

      } else {
         results[question.id] = 'error';
         this.setState({
            answerState: {[answerId]: 'error'},
            results
         });
      }

      const timeout = window.setTimeout(()=>{
         if(this.isQuizFinished()) {
            this.setState({
               isFinished: true
            })
         } else {
            this.setState({
               activeQuestion: this.state.activeQuestion + 1,
               answerState: null
            });
         }
         window.clearTimeout(timeout);
      }, 1000);
   };

   retryHandler = () => {
      this.setState({
         results: {}, // {[id]: 'success'||'error'}
         isFinished: false,
         activeQuestion: 0,
         answerState: null, // {[id]: 'success'||'error'}
      })
   };

   render() {
      return (
         <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
               <h1>Ответьте на все вопросы</h1>

               {
                  this.state.loading ? <Loader/> :  (
                     this.state.isFinished ?
                        <FinishedQuiz
                           results={this.state.results}
                           quiz={this.state.quiz}
                           onRetry={this.retryHandler}
                        /> :

                        <ActiveQuiz
                           answers={this.state.quiz[this.state.activeQuestion].answers}
                           question={this.state.quiz[this.state.activeQuestion].question}
                           onAnswerClick={this.onAnswerClickHandler}
                           quizLength={this.state.quiz.length}
                           answerNumber={this.state.activeQuestion + 1}
                           state={this.state.answerState}
                        />
                  )
               }
            </div>
         </div>
      )
   }
}

export default Quiz;
