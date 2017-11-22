import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { resetQuiz } from '../actions'
import Card from './Card'
import { green } from '../utils/colors'


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
      const { correct, incorrect } = this.props
      const percentCorrect = (correct / (correct + incorrect)) * 100

      return (
        <View style={styles.container}>
          <Text style={styles.summary}>
            Done! You got {percentCorrect}%  correct ({correct} out of {correct + incorrect})
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.count}>{currentQuestionIdx + 1} / {questions.length}</Text>
        <Card question={questions[currentQuestionIdx]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingLeft: 10,
   paddingRight: 10,
   justifyContent: 'center'
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'flex-start'
  },
  summary: {
    fontSize: 20,
    color: green,
    textAlign: 'center',
    justifyContent: 'center'
  }
})


function mapStateToProps (state, ownProps) {
  return {
    correct: state.answers.correct,
    incorrect: state.answers.incorrect,
    currentQuestionIdx: state.answers.currentQuestionIdx,
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Quiz)
