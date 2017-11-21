import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { receiveDecks, addDeck, quizStart } from '../actions'
import { AppLoading} from 'expo'
import Card from './Card'

class Deck extends Component {

  render() {
    const { navigate, state } = this.props.navigation
    const { title, questions } = state.params
    const {  dispatch, started, currentQuestionIdx } = this.props

    if (currentQuestionIdx === null) {
      return
    }

    if (currentQuestionIdx == questions.length) {
      return (
        <View>
          <Text>
            Done! {this.props.correct} correct out of {this.props.correct + this.props.incorrect}
          </Text>
        </View>
      )
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
            <TouchableOpacity onPress={() => dispatch(quizStart())}>
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
  return {
    correct: answers.answers.correct,
    incorrect: answers.answers.incorrect,
    currentQuestionIdx: answers.answers.currentQuestionIdx,
    started: answers.answers.quizStarted
  }
}

export default connect(mapStateToProps)(Deck)
