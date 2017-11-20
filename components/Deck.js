import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks, addDeck, quizStart } from '../actions'
import { AppLoading} from 'expo'
import Card from './Card'

class Deck extends Component {
  state = {
    started: false
  }

  handleStartQuiz() {
    this.props.dispatch(quizStart())
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { title, questions } = state.params
    const { started, currentQuestionIdx, dispatch } = this.props

    console.log(this.props)
    if (currentQuestionIdx === null) {
      return
    }

    if (!started) {
      return (
        <View>
          <Text>{title}</Text>
          <Text>{questions.length} Cards</Text>
          <TouchableOpacity>
            <Text>Add New Card</Text>
          </TouchableOpacity>
          {questions.length > 0 && (
            <TouchableOpacity onPress={this.handleStartQuiz.bind(this)}>
              <Text>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      )
    }
    return (
      <View>
        <Text>{currentQuestionIdx + 1} / {questions.length}</Text>
        <Card question={questions[currentQuestionIdx]} />
      </View>
    )
  }
}


function mapStateToProps (answers, ownProps) {
  console.log(answers)
  return {
    correct: answers.correct,
    incorrect: answers.incorrect,
    currentQuestionIdx: answers.currentQuestionIdx,
    started: answers.quizStarted
  }
}

export default connect(mapStateToProps)(Deck)
