import React, {Component} from 'react';
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quizList";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

   renderQuizes() {
      return this.props.quizes.map((quiz) => {
         return (
            <li
               key={quiz.id}
            >
               <NavLink to={'/quiz/' + quiz.id}>
                  {quiz.name}
               </NavLink>
            </li>
         )
      })
   }

   async componentDidMount() {
      await this.props.fetchQuizes();
   }

   render() {
      return (
         <div className={classes.QuizList}>
            {(this.props.loading && this.props.quizes.length) ? <Loader/> :
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

function mapStateToProps(state) {
   return {
      quizes: state.quizList.quizes,
      loading: state.quizList.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchQuizes: () => dispatch(fetchQuizes())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
