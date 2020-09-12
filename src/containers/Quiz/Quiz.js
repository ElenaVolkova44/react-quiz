import React, {Component} from "react";
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {fetchQuiz, retryHandler, answerClickHandler} from "../../store/actions/quiz";
import {connect} from "react-redux";

class Quiz extends Component {

   componentDidMount() {
      this.props.fetchQuiz(this.props.match.params.id);
   }

   render() {
      return (
         <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
               <h1>Ответьте на все вопросы</h1>

               {
                  this.props.loading ? <Loader/> : (
                     this.props.isFinished ?
                        <FinishedQuiz
                           results={this.props.results}
                           quiz={this.props.quiz}
                           onRetry={this.props.retryHandler}
                        /> :

                        <ActiveQuiz
                           answers={this.props.quiz[this.props.activeQuestion].answers}
                           question={this.props.quiz[this.props.activeQuestion].question}
                           onAnswerClick={(answerId) => {
                              this.props.answerClickHandler(answerId, {
                                 answerState: this.props.answerState,
                                 quiz: this.props.quiz,
                                 activeQuestion: this.props.activeQuestion,
                                 results: this.props.results
                              });
                           }}
                           quizLength={this.props.quiz.length}
                           answerNumber={this.props.activeQuestion + 1}
                           state={this.props.answerState}
                        />
                  )
               }
            </div>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      results: state.quiz.results, // {[id]: 'success'||'error'}
      isFinished: state.quiz.isFinished,
      activeQuestion: state.quiz.activeQuestion,
      answerState: state.quiz.answerState, // {[id]: 'success'||'error'}
      quiz: state.quiz.quiz,
      loading: state.quiz.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      retryHandler: () => dispatch(retryHandler()),
      fetchQuiz: (quizId) => dispatch(fetchQuiz(quizId)),
      answerClickHandler: (answerId, {answerState, quiz, activeQuestion, results}) => dispatch(answerClickHandler(answerId, {
         answerState,
         quiz,
         activeQuestion,
         results
      }))
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
