import { combineReducers } from 'redux';
import { RECEIVE_DECKS, ADD_QUESTION, ADD_DECK, ANSWER_QUESTION, QUIZ_START } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_QUESTION :
      return {
        ...state,
        ...action.question
      }
    case ADD_DECK :
      debugger
      return {
        ...state,
        ...action.deck
      }
    default :
      return state
  }
}

function answers (state = {correct: 0, incorrect: 0, currentQuestionIdx: 0, quizStarted: false}, action) {
  switch (action.type) {
    case ANSWER_QUESTION :
      action.correct ? state[correct] += 1 : state[incorrect] += 1
      state[currentQuestionIdx] += 1
      return {
        ...state
      }
    case QUIZ_START :
      return {
        ...state, quizStarted: true
      }
    default :
      return {
        ...state, quizStarted: false
      }
  }
}

const rootReducer = combineReducers({ decks, answers });
export default rootReducer;
