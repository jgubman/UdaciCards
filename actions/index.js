export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_ENTRY = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const QUIZ_START = 'QUIZ_START'


export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function answerQuestion (correct) {
  return {
    type: ANSWER_QUESTION,
    correct,
  }
}

export function quizStart () {
  return {
    type: QUIZ_START
  }
}
