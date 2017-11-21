import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { resetQuiz } from '../actions'
import Card from './Card'


class Quiz extends Component {

  componentWillMount () {
    this.props.dispatch(resetQuiz())
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { dispatch, currentQuestionIdx, decks } = this.props

    if ((currentQuestionIdx === null) || (decks === null)) {
      return
    }

    const { questions, title } = decks[deck]

    if (questions.length > 0 && currentQuestionIdx == questions.length) {
      return (
        <View>
          <Text>
            Done! {this.props.correct} correct out of {this.props.correct + this.props.incorrect}
          </Text>
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


function mapStateToProps (state, ownProps) {
  return {
    correct: state.answers.correct,
    incorrect: state.answers.incorrect,
    currentQuestionIdx: state.answers.currentQuestionIdx,
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Quiz)
