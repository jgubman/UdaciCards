import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'UdaciCards:decks'
export const DECK_QUIZ_DATE = 'UdaciCards:quizDate'


const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
      //return results === null ? dummyData : JSON.parse(results)
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => (decks[title]))
}

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}

export function addCardToDeck(entry, key) {

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      decks[key].questions.push(entry)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function getLastQuizDate(date) {
  return AsyncStorage.getItem(DECK_QUIZ_DATE)
    .then((results) => (JSON.parse(results)))
}

export function setQuizDate() {
  const now = new Date().getTime()
  AsyncStorage.setItem(DECK_QUIZ_DATE, JSON.stringify(now))
  return now
}
